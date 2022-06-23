const options = [
    {value: 1, label: 'Витебск'},
    {value: 2, label: 'Могилёв'},
    {value: 3, label: 'Гомель'},
    {value: 4, label: 'Брест'},
    {value: 5, label: 'Минск'},
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

        })

        this.itemsHTML = this.options.map(({value, label}) => {
            return `<li data-id=${value}>${label}</li>`
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

}

const customSelect = new DropDown('.select', options)
console.log(customSelect)