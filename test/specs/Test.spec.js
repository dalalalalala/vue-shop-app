import test from 'ava'
import { mount } from "@vue/test-utils"
import testDom from '../../pages/test.vue'

//验证 dom h1标签是否存在
test('has is h1',(t) => {
    const wrap = mount(testDom)
    t.is(wrap.contains('h1'),true)
})