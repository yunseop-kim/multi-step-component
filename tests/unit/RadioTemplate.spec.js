import {
    mount
} from '@vue/test-utils'
import {
    expect
} from 'chai';
import RadioTemplate from '@/components/InputTemplates/RadioTemplate.vue'
import myInput from "@/assets/input.json";

describe('RadioTemplate', () => {
    const formType = 2
    const wrapper = mount(RadioTemplate, {
        propsData: {
            item: myInput.items.find(item => item.formType == formType)
        }
    })
    const radioInputArray = wrapper.findAll('input[type="radio"]')
    
    it('formType이 2입니다.', () => {
        expect(wrapper.props().item.formType).equal(formType)
    })
    it('checkbox 갯수를 확인해봅니다.', () => {
        expect(wrapper.props().item.options.length).equal(radioInputArray.length)
    })
    it('출력된 값을 확인해봅니다.', () => {
        wrapper.props().item.options.forEach((option, index) => {
            expect(option.text).equal(radioInputArray.at(index).attributes('value'))
        })
    })
})