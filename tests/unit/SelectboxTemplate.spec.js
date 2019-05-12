import {
    mount
} from '@vue/test-utils'
import {
    expect
} from 'chai';
import SelectboxTemplate from '@/components/InputTemplates/SelectboxTemplate.vue'
import myInput from "@/assets/input.json";

describe('SelectboxTemplate', () => {
    const formType = 4;
    const wrapper = mount(SelectboxTemplate, {
        propsData: {
            item: myInput.items.find(item => item.formType == formType)
        }
    })
    const optionsArray = wrapper.findAll('option')

    it('formType이 4입니다.', () => {
        expect(wrapper.props().item.formType).equal(formType)
    })

    it('option 갯수를 확인해봅니다.', () => {
        expect(wrapper.props().item.options.length).equal(optionsArray.length)
    })

    it('출력된 값을 확인해봅니다.', () => {
        wrapper.props().item.options.forEach((option, index) => {
            expect(option.text).equal(optionsArray.at(index).attributes('value'))
        })
    })
})