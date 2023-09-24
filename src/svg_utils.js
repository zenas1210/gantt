export function $(expr, con) {
    return typeof expr === 'string'
        ? (con || document).querySelector(expr)
        : expr || null;
}

export function createSVG(tag, attrs) {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (let attr in attrs) {
        if (attr === 'append_to') {
            const parent = attrs.append_to;
            parent.appendChild(elem);
        } else if (attr === 'innerHTML') {
            elem.innerHTML = attrs.innerHTML;
        } else {
            elem.setAttribute(attr, attrs[attr]);
        }
    }
    return elem;
}

$.on = (element, event, selector, callback) => {
    if (!callback) {
        callback = selector;
        $.bind(element, event, callback);
    } else {
        $.delegate(element, event, selector, callback);
    }
};

$.off = (element, event, handler) => {
    element.removeEventListener(event, handler);
};

$.bind = (element, event, callback) => {
    event.split(/\s+/).forEach(function (event) {
        element.addEventListener(event, callback);
    });
};

$.delegate = (element, event, selector, callback) => {
    element.addEventListener(event, function (e) {
        const delegatedTarget = e.target.closest(selector);
        if (delegatedTarget) {
            e.delegatedTarget = delegatedTarget;
            callback.call(this, e, delegatedTarget);
        }
    });
};

$.closest = (selector, element) => {
    if (!element) return null;

    if (element.matches(selector)) {
        return element;
    }

    return $.closest(selector, element.parentNode);
};

$.attr = (element, attr, value) => {
    if (!value && typeof attr === 'string') {
        return element.getAttribute(attr);
    }

    if (typeof attr === 'object') {
        for (let key in attr) {
            $.attr(element, key, attr[key]);
        }
        return;
    }

    element.setAttribute(attr, value);
};
