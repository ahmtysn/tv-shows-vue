import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorBox from '@/components/ErrorBox.vue'

describe('ErrorBox', () => {
  it('shows the error message and the default retry button', () => {
    const wrapper = mount(ErrorBox, {
      props: { message: 'Failed to load shows' },
    })

    expect(wrapper.text()).toContain('Failed to load shows')
    expect(wrapper.find('button').text()).toBe('Try again')
  })

  it('uses a custom retry label when provided', () => {
    const wrapper = mount(ErrorBox, {
      props: { message: 'Failed to load shows', retryLabel: 'Reload' },
    })

    expect(wrapper.find('button').text()).toBe('Reload')
  })

  it('emits a retry event when the button is clicked', async () => {
    const wrapper = mount(ErrorBox, {
      props: { message: 'Failed to load shows' },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('retry')).toHaveLength(1)
  })

  it('has role="alert" so screen readers announce it', () => {
    const wrapper = mount(ErrorBox, {
      props: { message: 'Failed to load shows' },
    })

    expect(wrapper.attributes('role')).toBe('alert')
  })
})
