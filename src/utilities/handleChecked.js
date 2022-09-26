export const handleChecked = (checked, setChecked, key) => {
  const userChecked = JSON.parse(localStorage.getItem("checked"));

  if (!checked) {
    if (userChecked) {
      userChecked.push(key)
      localStorage.setItem("checked", JSON.stringify(userChecked))
    } else {
      localStorage.setItem("checked", JSON.stringify([key]))
    }
  } else {
    localStorage.setItem("checked", JSON.stringify(userChecked.filter(item => item !== key)))
  }

  setChecked(!checked);
}
