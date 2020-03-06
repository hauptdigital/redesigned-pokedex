export function createElement(tagName, attributes = {}) {
  let element = document.createElement(tagName);
  Object.keys(attributes).forEach(attributeKey => {
    element[attributeKey] = attributes[attributeKey];
  });
  return element;
}

export function appendElement(parent, elements = {}) {
  if (Array.isArray(elements)) {
    elements.forEach(element => {
      parent.appendChild(element);
    });
  } else {
    parent.appendChild(elements);
  }

  return elements;
}

export function removeAllChilds(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  return node;
}
