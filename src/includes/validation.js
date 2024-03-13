import { Form as VeeForm, Field as VeeField, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeValidate', VeeField)

    defineRule('required', required)
  }
}
