export function handleChecked(
    local_storage_key: string,
    key: string,
    checked: boolean,
    setChecked: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const items: string[] = JSON.parse(localStorage.getItem(local_storage_key) ?? "[]") ?? [];

    if (!checked) {
        if (items.length > 0) {
            items.push(key);
            console.log(items);
            localStorage.setItem(local_storage_key, JSON.stringify(items));
        } else {
            localStorage.setItem(local_storage_key, JSON.stringify([key]));
        }
    } else {
        localStorage.setItem(
            local_storage_key,
            JSON.stringify(items.filter(item => item !== key))
        );
    }

    setChecked(!checked);
}
