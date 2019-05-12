import {
    mount
} from '@vue/test-utils'
import {
    expect
} from 'chai';
import TextInputTemplate from '@/components/InputTemplates/TextInputTemplate.vue'
import myInput from "@/assets/input.json";

describe('TextInputTemplate', () => {
    const formType = 3
    const wrapper = mount(TextInputTemplate, {
        propsData: {
            item: myInput.items.find(item => item.formType == formType)
        }
    })
    const textInput = wrapper.findAll('input[type="text"]')

    it('formType이 3입니다.', () => {
        expect(wrapper.props().item.formType).equal(formType)
    })

    it('텍스트박스가 있어야 합니다.', () => {
        expect(textInput.length).equal(1)
    })
})