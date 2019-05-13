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

class TestHelper {
    _wrapper;
    _data;
    _lastStep;
    constructor(wrapper, data) {
        this._wrapper = wrapper;
        this._data = data;
        this._lastStep = this._data.myInput.items.length - 1
    }

    checkFormType() {
        const formType = this._data.myInput.items[this._data.step].formType
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

    findButton(text) {
        const buttons = this._wrapper.findAll('.button')

        // findAll에는 toArray가 없어서 이렇게 래핑.
        let array = []
        for (let i = 0; i < buttons.length; i++) {
            array.push(buttons.at(i));
        }

        const index = array.findIndex((button) => button.text() == text)
        return buttons.at(index);
    }

    checkButton() {
        if (this._data.step == 0) {
            // step 0 : 다음버튼 1개
            const buttons = this._wrapper.findAll('.button')
            expect(buttons.length).equal(1)
            const button = buttons.at(0)
            expect(button.text()).equal('다음')
        } else if (this._data.step > 0 && this._data.step < this._lastStep) {
            const buttons = this._wrapper.findAll('.button')
            expect(buttons.length).equal(2)
            expect(this.findButton('이전').text()).equal('이전')
            expect(this.findButton('다음').text()).equal('다음')
        } else {
            const buttons = this._wrapper.findAll('.button')
            expect(buttons.length).equal(2)
            expect(this.findButton('이전').text()).equal('이전')
            expect(this.findButton('제출').text()).equal('제출')
        }
    }

    goBack() {
        const currentStep = this._data.step
        this.findButton('이전').trigger('click')
        localVue.nextTick(() => {
            expect(this._data.step).equal(currentStep - 1);
            expect(store.state.output.items.length).equal(currentStep - 1);
        })
    }

    goNext(expectAnswer) {
        const currentStep = this._data.step
        if (this._lastStep == currentStep) {
            this.findButton('제출').trigger('click')
        } else {
            this.findButton('다음').trigger('click')
        }
        localVue.nextTick(() => {
            expect(this._data.step).equal(currentStep + 1);
            expect(store.state.output.items.length).equal(currentStep + 1);
            expect(store.state.output.items[currentStep].answer).equal(expectAnswer);
        })
    }

    setAnswer() {
        const item = this._data.myInput.items[this._data.step]
        const formType = this.checkFormType(item.formType)
        const inputs = this._wrapper.findAll(`input[type="${formType}"]`)
        const shuffledArray = this.shuffle([...Array(item.options.length).keys()])
        if (formType == 'checkbox') {
            const expectAnswerArray = []
            for (let i = 0; i < shuffledArray.length; i++) {
                const pick = shuffledArray[i]
                inputs.at(pick).trigger('click')
                expectAnswerArray.push(item.options[pick].text)
            }
            return expectAnswerArray.join(',')
        } else if (formType == 'radio') {
            const pick = shuffledArray[0]
            inputs.at(pick).trigger('click')
            return item.options[pick].text;
        } else if (formType == 'option') {
            const inputs = this._wrapper.findAll(formType);
            const pick = shuffledArray[0]
            inputs.at(pick).element.selected = true
            this._wrapper.find('select').trigger('change')
            return item.options[pick].text;
        } else if (formType == 'text') {
            const expectAnswer = '테스트용'
            inputs.at(0).setValue(expectAnswer)
            return expectAnswer;
        } else {
            throw 'invalid type!'
        }
    }

    shuffle(o) {
        for (let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
}

describe('App', () => {
    const wrapper = mount(App, {
        store
    })
    const testHelper = new TestHelper(wrapper, wrapper.vm);

    it('step 0부터 시작합니다.', () => {
        expect(typeof App.data).equal('function')
        const defaultData = App.data()
        expect(defaultData.step).equal(0)
    })

    it('step 0에서는 "다음" 버튼만 존재합니다.', () => {
        testHelper.checkButton()
    })

    it('step 0에서는 "다음" 버튼을 클릭하면, 다음 단계로 넘어갑니다..', () => {
        expect(wrapper.vm.step).equal(0);
        const formType = testHelper.checkFormType()
        expect(formType).equal('checkbox');
        const expectAnswer = testHelper.setAnswer();
        testHelper.goNext(expectAnswer)
    })

    it('step 1에서 "이전" 버튼을 클릭하면, 전 단계로 돌아갑니다.', () => {
        expect(wrapper.vm.step).equal(1);
        testHelper.goBack()
    })

    it(`step 0에서는 선택시에 join(',') 을 이용해서 답을 합칩니다.`, () => {
        expect(wrapper.vm.step).equal(0);
        const formType = testHelper.checkFormType()
        expect(formType).equal('checkbox');
        const expectAnswer = testHelper.setAnswer();
        testHelper.goNext(expectAnswer)
    })

    it(`step 1에는 버튼이 두개입니다.`, () => {
        testHelper.checkButton()
    })

    it(`step 1에는 라디오 버튼을 체크합니다.`, () => {
        expect(wrapper.vm.step).equal(1);
        const formType = testHelper.checkFormType()
        expect(formType).equal('radio');
        const expectAnswer = testHelper.setAnswer();
        testHelper.goNext(expectAnswer)
    })

    it(`step 2에는 텍스트 박스에 값을 입력합니다.`, () => {
        expect(wrapper.vm.step).equal(2);
        const formType = testHelper.checkFormType()
        expect(formType).equal('text');
        const expectAnswer = testHelper.setAnswer();
        testHelper.goNext(expectAnswer)
    })

    it(`step 3에는 select box를 체크합니다.`, () => {
        expect(wrapper.vm.step).equal(3);
        const formType = testHelper.checkFormType()
        expect(formType).equal('option');
        const expectAnswer = testHelper.setAnswer();
        testHelper.goNext(expectAnswer)
    })
})