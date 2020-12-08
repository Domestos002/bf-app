import {eventDelegate} from "../../helpers";
import SvgIcon from "../SvgIcon/SvgIcon";

export default {
    props: {
        valuePropName: {
            type: String,
            default: 'val'
        },

        value: {
            type: String | Array,
            default: null | []
        },

        options: {
            type: Array,
            default: []
        },

        id: {
            type: String,
            default: null
        }
    },

    data() {
        return {
            isOpened: false,
            isFocused: false,
            optionsArr: [{id: 0, val: '', active: true}]
        }
    },

    components: {
        SvgIcon
    },

    mounted() {
        //если произошел клик вне селекта
        document.addEventListener('click', e => {
            if(!e.target.matches('.selector__single') && !e.target.matches('.selector__item')) {
                this.close()
            }
        });
    },

    watch: {
        options: {
            handler() {
                this.updateOptions();
                this.updateSelected();
            },
            immediate: true
        },

        value: {
            handler(newVal) {
                this.selectOption({ val: newVal });
            },
            immediate: true
        }
    },

    computed: {
        active() {
            return this.optionsArr.find(el => el.active)
        },
        highlight() {
            return this.optionsArr.find(el => el.highlight)
        },
        currentSelected() {
            return this.active.val
        }
    },

    methods: {
        updateSelected() {
            let id = this.value.id != null ? this.value.id : 0;
            this.selectOption({ id: id});
        },

        updateOptions() {
            if(this.options.length === 0) {
                return false;
            }

            let isValEmpty = !(this.value && this.value.length > 0);

            this.optionsArr = this.options.map((el,index) => {
                let id = el.hasOwnProperty('id') ? el.id : index;
                let active = isValEmpty ? index === 0 : this.value.id === el.id;
                return {
                    id: id,
                    num: index,
                    highlight: active,
                    active: active,
                    val: typeof el === 'object' ? el[this.valuePropName] : el
                }
            })
        },

        updateValue() {
            let data = {id: this.active.id};
                data[this.valuePropName] = this.active.val;

            this.$emit('input', data);
        },

        selectOption({ id, val}){
            let el;

            if(id != null) {
                el = this.optionsArr.find(el => el.id === id)
            } else {
                el = this.optionsArr.find(el => el.val === val[this.valuePropName])
            }

            if(el == null) {
                return false;
            }

            if(this.active.id !== el.id) {
                this.active.active = false;
                el.active = true;
            }
        },

        highlightOption({ id, val}){
            let el;

            if(id != null) {
                el = this.optionsArr.find(el => el.id === id)
            } else {
                el = this.optionsArr.find(el => el.val === val[this.valuePropName])
            }

            if(el == null) {
                return false;
            }

            if(this.highlightOption.id !== el.id) {
                this.highlight.highlight = false;
                el.highlight = true;
            }
        },

        selectHighlighted() {
            if(!this.highlight || !this.active) {
                return false;
            }

            if(this.highlight.id !== this.active.id) {
                this.selectOption({id: this.highlight.id});
            }
        },

        highlightSelected() {
            if(!this.highlight || !this.active) {
                return false;
            }

            if(this.highlight.id !== this.active.id) {
                this.highlightOption({id: this.active.id});
            }
        },

        onFocus() {
            this.isFocused = true;
            this.toggleOpened();
        },

        onClick() {
            //предупреждение повторного открытия и закрытия,
            // в случае активации селекта через tab
            if(!this.isFocused) {
                this.toggleOpened();
            }

            this.isFocused = false
        },

        onBlur(e) {
            if(e.relatedTarget != null) {
                this.close();
            }
        },

        toggleOpened() {
            this.isOpened = !this.isOpened;
        },

        close() {
            if(this.isOpened) {
                this.isOpened = false
            }

            this.highlightSelected();
        },

        itemsClick(e) {
            eventDelegate(e, '.selector__item', target => {
                this.isFocused = false;

                this.selectOption({id: parseInt(target.dataset.id)});

                this.updateValue();

                this.close();
            });
        },

        highlightNextOption() {
            let nextNum = this.highlight.num < this.optionsArr.length-1 ? this.highlight.num + 1 : 0;
            let next = this.optionsArr.find(el => el.num === nextNum);
            this.highlightOption({id: next.id});
        },

        highlightPrevOption() {
            let prevNum = this.highlight.num > 0 ? this.highlight.num - 1 : this.optionsArr.length-1;
            let prev = this.optionsArr.find(el => el.num === prevNum);
            this.highlightOption({id: prev.id});
        },


        onKeyDown({keyCode}) {
            switch (keyCode) {
                //вверх
                case 38:
                    this.highlightPrevOption();
                    break;
                //вниз
                case 40:
                    this.highlightNextOption();
                    break;
                //enter
                case 13:
                    this.selectHighlighted();
                    this.updateValue();
                    this.close();
                    break;
                //escape
                case 27:
                    this.close();
                    break;
            }
        }
    }
};
