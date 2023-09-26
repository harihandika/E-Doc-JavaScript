const getItem = ({ key, label, icon, children, type }) => ({
  key,
  label,
  icon,
  children,
  type,
});

export const generateMenuItems = (adminMenu) => {
  if (adminMenu.length === 0) return [];

  const tempMenuItems = adminMenu.filter((item) => item.show);
  const menuItems = [];

  const getMenuItems = (item) => {
    const tempArr = [];
    // eslint-disable-next-line no-prototype-builtins
    if (item.hasOwnProperty("type")) {
      if (item.type === "divider") {
        tempArr.push({ type: item.type });
        return tempArr[0];
      }
    }

    // eslint-disable-next-line no-prototype-builtins
    if (item.hasOwnProperty("children")) {
      const menuChildren = [];
      const tempShowedChildren = item.children.filter((child) => child.show);

      tempShowedChildren.forEach((child) => {
        menuChildren.push(getMenuItems(child));
      });

      const showedChildren = menuChildren.map((showedChild) =>
        getItem(showedChild)
      );

      const selectedItem = { ...item, children: showedChildren };
      tempArr.push(getItem(selectedItem));
    } else {
      tempArr.push(getItem(item));
    }
    return tempArr[0];
  };

  tempMenuItems.forEach((item) => {
    menuItems.push(getMenuItems(item));
  });
  return menuItems;
};
