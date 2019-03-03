import Mock from 'mockjs'
import { CommonData } from '@/types/common'

const Random = Mock.Random

export const listData: CommonData[] = Array.from({ length: 10 }).map(v =>
  Mock.mock({
    label: Mock.mock('@title'),
    value: Random.id()
  })
)

export const cascaderList: CommonData[] = Array.from({ length: 3 }).map(v =>
  Mock.mock({
    label: Mock.mock('@title'),
    value: Random.id(),
    children: Array.from({ length: 4 }).map(v =>
      Mock.mock({
        label: Mock.mock('@title'),
        value: Random.id()
      })
    )
  })
)

export const transferData: CommonData[] = Array.from({ length: 10 }).map(v =>
  Mock.mock({
    label: Mock.mock('@title'),
    value: Random.id(),
    key: Random.id()
  })
)
