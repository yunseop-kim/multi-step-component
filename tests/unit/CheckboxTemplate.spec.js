// 체크박스
// 라디오
// 셀렉트박스
// 텍스트
// 변이
import {
    mount
} from '@vue/test-utils'
import {
    expect
} from 'chai';
import CheckboxTemplate from '@/components/InputTemplates/CheckboxTemplate.vue'
import myInput from "@/assets/input.json";

describe('CheckboxTemplate', () => {
    const formType = 1
    const wrapper = mount(CheckboxTemplate, {
        propsData: {
            item: myInput.items.find(item => item.formType == formType)
        }
    })
    const checkboxArray = wrapper.findAll('input[type="checkbox"]')
    
    it('formType이 1입니다.', () => {
        expect(wrapper.props().item.formType).equal(formType)
    })

    it('checkbox 갯수를 확인해봅니다.', () => {
        expect(wrapper.props().item.options.length).equal(checkboxArray.length)
    })

    it('출력된 값을 확인해봅니다.', () => {
        wrapper.props().item.options.forEach((option, index) => {
            expect(option.text).equal(checkboxArray.at(index).attributes('value'))
        })
    })
})