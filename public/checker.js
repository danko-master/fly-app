let needCheckStatus = false;
// Если есть статусы в процессе обработки, то перепроверим статусы

// Get all <td> elements with a specific class name
const tdsWithClass = document.querySelectorAll("td.check-status-code");

// Iterate through the collection of elements
tdsWithClass.forEach((td) => {
  // Check for the presence of an attribute
  if (td.hasAttribute("data-status-code")) {
    const attributeValue = td.getAttribute("data-status-code");
    if (["uploaded", "reading", "parsing"].includes(attributeValue)) {
      needCheckStatus = true;
    }
    // console.log(
    //   `TD with class 'yourClassName' has 'data-myattribute' with value: ${attributeValue}`
    // );
  } else {
    // console.log(`TD with class 'yourClassName' does not have 'data-myattribute'.`);
  }
});

if (needCheckStatus) {
  // Для обновления статуса, в дальнейшем брать статус из брокера сообщений в режиме "онлайн"
  setTimeout(() => {
    window.location.reload();
  }, 5000);
}
