import { merge } from '../../../packages/utils/index'

describe('./utils/index.ts -> merge', () => {
  it('两个对象合并', () => {
    const obj1 = {
      a: '1',
      aa: {
        aa1: 'aa1',
        aa2: {
          aa2_1: 'aa2_1'
        }
      },
      z: 1,
      x: [],
      y: undefined
    }
    const obj2 = {
      b: '2'
    }
    const result = {
      a: '1',
      aa: {
        aa1: 'aa1',
        aa2: {
          aa2_1: 'aa2_1'
        }
      },
      b: '2',
      x: [],
      y: undefined,
      z: 1
    }
    expect(merge(obj1, obj2)).toMatchObject(result)
  })

  it('多个对象合并', () => {
    const obj1 = {
      a: '1',
      aa: {
        aa1: 'aa1',
        aa2: {
          aa2_1: 'aa2_1'
        }
      }
    }
    const obj2 = {
      b: '2'
    }
    const obj3 = {
      c: '2'
    }
    const obj4 = {
      d: '3',
      d1: {
        d1: 'd1'
      }
    }
    const obj5 = {
      e: '2'
    }
    const result = {
      a: '1',
      b: '2',
      c: '2',
      d: '3',
      e: '2',
      aa: {
        aa1: 'aa1',
        aa2: {
          aa2_1: 'aa2_1'
        }
      },
      d1: {
        d1: 'd1'
      }
    }
    expect(merge(obj1, obj2, obj3, obj4, obj5)).toMatchObject(result)
  })

  it('对象合并，重复的属性增量覆盖', () => {
    const obj1 = {
      a: '1',
      a1: {
        a1_1: 'a1_1',
        a1_x1: {
          a1_x1_1: 'a1_x1_1'
        }
      }
    }
    const obj2 = {
      b: {
        b1: [1]
      },
      c: 'c',
      a1: {
        a1_2: 'a1_2',
        a1_x1: {
          a1_x2_1: 'a1_x2_1'
        }
      }
    }
    const obj3 = {
      a: 'a1',
      b: {
        b1: [2],
        b2: 'sdf'
      },
      c: 'c1',
      d: 'd',
      a1: {
        a1_1: 'a1_1_1',
        a1_3: 'a1_3'
      }
    }
    const result = {
      a: 'a1',
      b: {
        b1: [2],
        b2: 'sdf'
      },
      c: 'c1',
      d: 'd',
      a1: {
        a1_1: 'a1_1_1',
        a1_2: 'a1_2',
        a1_3: 'a1_3',
        a1_x1: {
          a1_x1_1: 'a1_x1_1',
          a1_x2_1: 'a1_x2_1'
        }
      }
    }
    expect(merge(obj1, obj2, obj3)).toMatchObject(result)
  })
})
