import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import ShowCard from '@/components/ShowCard.vue'
import { makeShow } from '../helpers/fixtures'

const globalOpts = {
  global: { stubs: { RouterLink: RouterLinkStub } },
}

describe('ShowCard', () => {
  it('renders the show name', () => {
    const wrapper = mount(ShowCard, {
      ...globalOpts,
      props: {
        show: makeShow({ name: 'Breaking Bad', rating: { average: 9.2 } }),
      },
    })

    expect(wrapper.text()).toContain('Breaking Bad')
    expect(wrapper.find('.show-card__badge').text()).toContain('9.2')
  })

  it('hides the rating badge when no rating is available', () => {
    const wrapper = mount(ShowCard, {
      ...globalOpts,
      props: { show: makeShow({ rating: { average: null } }) },
    })

    expect(wrapper.find('.show-card__badge').exists()).toBe(false)
  })

  it('renders the image when provided', () => {
    const wrapper = mount(ShowCard, {
      ...globalOpts,
      props: {
        show: makeShow({
          image: {
            medium: 'https://example.com/breaking-bad.jpg',
            original: 'https://example.com/original-breaking-bad.jpg',
          },
        }),
      },
    })

    expect(wrapper.find('img.show-card__image').attributes('src')).toBe(
      'https://example.com/breaking-bad.jpg',
    )
    expect(wrapper.find('.show-card__placeholder').exists()).toBe(false)
  })

  it('shows a placeholder when there is no image', () => {
    const wrapper = mount(ShowCard, {
      ...globalOpts,
      props: { show: makeShow({ image: null }) },
    })

    expect(wrapper.find('.show-card__placeholder').exists()).toBe(true)
    expect(wrapper.find('.show-card__image').exists()).toBe(false)
  })

  it('links to the show detail route', () => {
    const wrapper = mount(ShowCard, {
      ...globalOpts,
      props: { show: makeShow({ id: 42 }) },
    })

    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props('to')).toEqual({ name: 'show-detail', params: { id: 42 } })
  })
})
