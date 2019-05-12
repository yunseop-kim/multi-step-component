import {
    createLocalVue,
    mount
} from '@vue/test-utils'
import Vuex from 'vuex'
import {
    expect
} from 'chai';
import App from '@/App.vue'
import store from '@/store'
const localVue = createLocalVue()
localVue.use(Vuex)

function formTypeChecker(formType) {
    switch (formType) {
        case 1:
            return "checkbox";
        case 2:
            return "radio";
        case 3:
            return "text";
        case 4:
            return "option";
        default:
            return "text";
    }
}

// class TestHelper {
//     _wrapper;
//     _data;
//     _store;
//     constructor(wrapper, data, store) {
//         this._wrapper = wrapper;
//         this._data = data;
//         this._store = store;
//     }

//     checkFormType() {
//         switch (formType) {
//             case 1:
//                 return "checkbox";
//             case 2:
//                 return "radio";
//             case 3:
//                 return "text";
//             case 4:
//                 return "option";
//             default:
//                 return "text";
//         }
//     }

//     findButton(text) {
//         const buttons = wrapper.findAll('.button')
//         const index = buttons.findIndex((button) => button.text() == text)
//         return buttons.at(index);
//     }

//     checkButton() {
//         // TODO: 버튼 분간하는 method 필요.
//         // step 0 : 다음버튼 1개
//         if (this._data.step == 0) {
//             const buttons = wrapper.findAll('.button')
//             expect(buttons.length).equal(1)
//             const button = buttons.at(0)
//             expect(button.text()).equal('다음')
//         } else if (this._data.step > 0 && this._data.step < this._data.myInput.items.length) {
//             // step n-1 : 버튼 2개, (이전, 다음)
//             const buttons = wrapper.findAll('.button')
//             expect(buttons.length).equal(2)
//             expect(this.findButton('이전').text()).equal('이전')
//             expect(this.findButton('다음').text()).equal('다음')
//         } else {
//             // step n: 버튼 두개, (이전, 제출)
//             const buttons = wrapper.findAll('.button')
//             expect(buttons.length).equal(2)
//             expect(this.findButton('이전').text()).equal('이전')
//             expect(this.findButton('제출').text()).equal('제출')
//         }
//     }

//     goBack() {
//         const currentStep = this.data.step
//         localVue.nextTick(() => {
//             expect(this.data.step).equal(currentStep - 1);
//             expect(store.state.output.items.length).equal(currentStep - 1);
//         })
//     }

//     goNext(expectAnswer) {
//         const currentStep = this.data.step
//         localVue.nextTick(() => {
//             expect(wrapper.vm.step).equal(currentStep + 1);
//             expect(store.state.output.items.length).equal(1);
//             expect(store.state.output.items[currentStep].answer).equal(expectAnswer);
//         })
//     }

//     // 엘리먼트 타입별 테스트 메소드 생성하기.
//     // 1. 체크박스
//     // 2. 라디오
//     // 3. 텍스트
//     // 4. 셀렉트박스
// }

describe('App', () => {
    const wrapper = mount(App, {
        store
    })
    const myInput = wrapper.vm.myInput

    it('step 0부터 시작합니다.', () => {
        expect(typeof App.data).equal('function')
        const defaultData = App.data()
        expect(defaultData.step).equal(0)
    })

    it('step 0에서는 "다음" 버튼만 존재합니다.', () => {
        const button = wrapper.findAll('.button').at(0)
        expect(button.text()).equal('다음')
    })

    // TODO: 버튼 분간하는 method 필요.
    // step 0 : 다음버튼 1개
    // step n-1 : 버튼 2개, (이전, 다음)
    // step n: 버튼 두개, (이전, 제출)

    it('step 0에서는 "다음" 버튼을 클릭하면, 다음 단계로 넘어갑니다..', () => {
        expect(wrapper.vm.step).equal(0);
        const formType = formTypeChecker(myInput.items[wrapper.vm.step].formType)
        expect(formType).equal('checkbox');

        // 체크박스 선택
        // 체크박스는 다중 선택을 하는 엘리먼트이다.
        const inputs = wrapper.findAll(`input[type="${formType}"]`)
        inputs.at(1).trigger('click')

        // 다음 버튼 클릭
        const button = wrapper.findAll('.button').at(0)
        expect(button.text()).equal('다음')
        button.trigger('click')

        localVue.nextTick(() => {
            expect(wrapper.vm.step).equal(1);
            expect(store.state.output.items.length).equal(1);
        })
    })

    it('step 1에서 "이전" 버튼을 클릭하면, 전 단계로 돌아갑니다.', () => {
        const currentStep = wrapper.vm.step
        expect(currentStep).equal(1);

        // TODO: 버튼 이전, 이후를 찾는 method를 만들자.
        const button = wrapper.findAll('.button').at(0)
        expect(button.text()).equal('이전')
        button.trigger('click')

        localVue.nextTick(() => {
            expect(wrapper.vm.step).equal(currentStep - 1);
            expect(store.state.output.items.length).equal(currentStep - 1);
        })
    })

    it(`step 0에서는 선택시에 join(',') 을 이용해서 답을 합칩니다.`, () => {
        const currentStep = wrapper.vm.step
        expect(currentStep).equal(0);

        const formType = formTypeChecker(myInput.items[currentStep].formType)
        expect(formType).equal('checkbox');

        // 체크박스 선택
        const inputs = wrapper.findAll(`input[type="${formType}"]`)
        inputs.at(1).trigger('click')
        inputs.at(2).trigger('click')

        // TODO: myInput.item의 formType과 여기서 어떤 input type을 사용하는지에 대한 지식을 프로그램이 알아야 한다.
        // Checkbox일때만의 특별한 검사 방법을 로직화 한다.
        const expectAnswers = [
            myInput.items[currentStep].options[1].text,
            myInput.items[currentStep].options[2].text
        ].join(',')

        // 다음 버튼 클릭
        const button = wrapper.findAll('.button').at(0)
        expect(button.text()).equal('다음')
        button.trigger('click')

        localVue.nextTick(() => {
            expect(wrapper.vm.step).equal(currentStep + 1);
            expect(store.state.output.items.length).equal(1);
            expect(store.state.output.items[currentStep].answer).equal(expectAnswers);
        })
    })

    it(`step 1에는 버튼이 두개입니다.`, () => {
        const buttons = wrapper.findAll('.button')
        expect(buttons.length).equal(2);
    })

    it(`step 1에는 라디오 버튼을 체크합니다.`, () => {
        // TODO: last step임을 체크 하는 함수가 필요할거 같습니다.
        const formType = formTypeChecker(myInput.items[wrapper.vm.step].formType)
        expect(formType).equal('radio');

        // 라디오 버튼 선택
        // TODO: 라디오 버튼은 단일 선택을 한다.
        const inputs = wrapper.findAll(`input[type="${formType}"]`)
        inputs.at(1).trigger('click')
        const expectAnswer = myInput.items[wrapper.vm.step].options[1].text

        // 다음 버튼 클릭
        const buttons = wrapper.findAll('.button')
        const nextButton = buttons.at(1)
        expect(nextButton.text()).equal('다음')
        nextButton.trigger('click')

        localVue.nextTick(() => {
            expect(wrapper.vm.step).equal(2);
            expect(store.state.output.items.length).equal(2);
            expect(store.state.output.items[(wrapper.vm.step - 1)].answer).equal(expectAnswer);
        })
    })

    it(`step 2에는 텍스트 박스에 값을 입력합니다.`, () => {
        // TODO: last step임을 체크 하는 함수가 필요할거 같습니다.
        const formType = formTypeChecker(myInput.items[wrapper.vm.step].formType)
        expect(formType).equal('text');

        // 텍스트박스에 값 입력
        // TODO: 텍스트 박스는 값 입력을 받는다.
        const inputs = wrapper.findAll(`input[type="${formType}"]`)
        expect(inputs.length).equal(1);
        const expectAnswer = '테스트용'
        inputs.at(0).setValue(expectAnswer)

        // 다음 버튼 클릭
        const buttons = wrapper.findAll('.button')
        const nextButton = buttons.at(1)
        expect(nextButton.text()).equal('다음')
        nextButton.trigger('click')

        localVue.nextTick(() => {
            expect(wrapper.vm.step).equal(3);
            expect(store.state.output.items.length).equal(3);
            expect(store.state.output.items[(wrapper.vm.step - 1)].answer).equal(expectAnswer);
        })
    })

    it(`step 3에는 select box를 체크합니다.`, () => {
        const formType = formTypeChecker(myInput.items[wrapper.vm.step].formType)
        expect(formType).equal('option');

        // 셀렉트 박스 선택 (1번 index)
        // TODO: 셀렉트 박스는 단일 선택을 한다.
        const inputs = wrapper.findAll(formType)
        inputs.at(1).element.selected = true
        wrapper.find('select').trigger('change')
        const itemOptions = myInput.items[wrapper.vm.step].options
        expect(inputs.length).equal(itemOptions.length)
        const expectAnswer = myInput.items[wrapper.vm.step].options[1].text

        // 다음 버튼 클릭
        const buttons = wrapper.findAll('.button')
        const nextButton = buttons.at(1)
        if (wrapper.vm.step === (myInput.items.length - 1)) {
            expect(nextButton.text()).equal('제출')
        } else {
            expect(nextButton.text()).equal('다음')
        }
        nextButton.trigger('click')

        localVue.nextTick(() => {
            expect(wrapper.vm.step).equal(4);
            expect(store.state.output.items.length).equal(4);
            expect(store.state.output.items[(wrapper.vm.step - 1)].answer).equal(expectAnswer);
        })
    })
})