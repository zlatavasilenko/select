const options = [
    {value: 1, label: 'Витебск', group: 'Первая'},
    {value: 2, label: 'Могилёв', group: 'вторая'},
    {value: 3, label: 'Гомель', group: 'вторая'},
    {value: 4, label: 'Брест', group: 'Четвёртая'},
    {value: 5, label: 'Минск', group: 'Четвёртая'},
]
class DropDown {
    constructor(selector, options) {
        this.$select = document.querySelector(selector);
        this.options = options;
        this.defaultLabel = document.querySelector('.select__box').innerHTML = this.options[0].label
        this.$label = document.querySelector('.select__box')
        this.$dropDown = document.querySelector('.select__label')
        this.$select.addEventListener('click', (e) => {
            if (e.target.classList.contains('select__box')) {
                if (this.$select.classList.contains('active')) {
                    this.close()
                } else {
                    this.open()
                }
            } else {
                if (e.target.tagName.toLowerCase() === 'li') {
                    this.selectedItem(e.target.dataset.id)
                }
            }
        })/*
        this.itemsHTML = this.options.map(({value, label}) => {
            return `<li data-id=${value}>${label}</li>`
        }).join('')*/
        this.itemsHTML = this.initGroup(this.options).map(([key, items]) => {
            if (key) {
                const groupList = items.map(({value, label}) => `<li data-id=${value}>${label}</li>`).join()
                return `<ul><span>${key}</span>${groupList}</ul>`
            } else {
                return items.map(({value, label}) => `<li data-id=${value}>${label}</li>`).join('')
            }

        }).join('')

        this.$dropDown.insertAdjacentHTML('afterbegin', this.itemsHTML)
    }
    selectedItem(id) {
        this.$label.innerHTML = this.options.find(item => item.value === id).label
        this.close()
    }
    open() {
        this.$select.classList.add('active')
    }
    close() {
        this.$select.classList.remove('active')
    }
    initGroup(items) {
        const group = new Map()
        items.forEach(item => {
            if (!group.has(item.group)) {
                group.set(item.group, [item])
            } else {
                group.set(item.group, [...group.get(item.group), item])
            }
        })
        return Array.from(group.entries())
    }
}
const customSelect = new DropDown('.select', options)
console.log(customSelect)