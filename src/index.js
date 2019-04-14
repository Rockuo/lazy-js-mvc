export const Controller = require('./Controller').default;

export const DATA_METADATA_SINGLE = Symbol('single');
export const DATA_METADATA_MULTIPLE = Symbol('multiple');
export const ELEMENTS_METADATA_SINGLE = Symbol('single');
export const ELEMENTS_METADATA_MULTIPLE = Symbol('multiple');

const mvc = {
    init(controllers) {
        if(controllers['_jsMvcControllersAll'])
        {
            controllers = Object.assign({}, ...controllers['_jsMvcControllersAll']);
        }
        else {
            controllers = {...controllers};
        }

        let controllerMethodEl = document.querySelector('input[data-js-mvc-routing="js-mvc-route"]');
        if (!controllerMethodEl || !controllerMethodEl.value || controllerMethodEl.value.indexOf('::') === -1) {
            throw new Error('Invalid Controller::method');
        }
        let [fullClass, method] = controllerMethodEl.value.split('::');
        let [className] = fullClass.split('\\').slice(-1);

        if (controllers[className]) {
            let controller = new controllers[className]();
            if (controller[method]) {
                let metadata = {};
                controller[method](getElements(metadata), getData(metadata), metadata);
            }
        }
    }
};
export default mvc;

function getElements(metadata = {}) {
    let elements = {};
    metadata.elementsMetadata = {};
    for (let elem of document.querySelectorAll('[data-js-mvc-element]')) {
        let key = elem.getAttribute('data-js-mvc-element');

        if (!metadata.elementsMetadata[key]) {
            metadata.elementsMetadata[key] = ELEMENTS_METADATA_SINGLE;
            elements[key] = elem;
        } else if (metadata.elementsMetadata[key] === ELEMENTS_METADATA_SINGLE) {
            metadata.elementsMetadata[key] = ELEMENTS_METADATA_MULTIPLE;
            data[key] = [data[key], elem];
        } else {
            data[key].push(elem);
        }
    }
    return elements;
}

function getData(metadata = {}) {
    let data = {};
    metadata.dataMetadata = {};
    for (let elem of document.querySelectorAll('[data-js-mvc-data]')) {
        let key = elem.getAttribute('data-js-mvc-data');
        let value = JSON.parse(elem.value);

        if (!!+elem.getAttribute('data-js-mvc-is-scalar')) {
            value = value[0];
        }
        if (!metadata.dataMetadata[key]) {
            metadata.dataMetadata[key] = DATA_METADATA_SINGLE;
            data[key] = value;
        } else if (metadata.dataMetadata[key] === DATA_METADATA_SINGLE) {
            metadata.dataMetadata[key] = DATA_METADATA_MULTIPLE;
            data[key] = [data[key], value];
        } else {
            data[key].push(value);
        }
    }
    return data;
}