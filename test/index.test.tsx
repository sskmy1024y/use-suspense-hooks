import { Suspense } from 'react'
import {resetAllCache, useSuspenseState, useSuspenseValue} from '../src'
import { render, waitFor, cleanup } from "@testing-library/react";

const TEST_ID = "test-text"

const FallbackComponent = () => {
  return <div data-testid={TEST_ID}>{"loading"}</div>
}

afterEach(() => {
  cleanup()
  resetAllCache()
})

describe('useSuspenseValue', () => {
  const SuspenseComponent = () => {
    const renderText = useSuspenseValue(`test_render_key`, async () => new Promise<string>((resolve) => {
      setTimeout(() => resolve("hello"), 50);
    }))
    return <div data-testid={TEST_ID}>{renderText}</div>
  }

  const Lazy = () => {
    return (
      <Suspense fallback={<FallbackComponent />}>
        <SuspenseComponent />
      </Suspense>
    )
  }

  test('Suspense works correctly', async () => {
    const {getByTestId} = render(<Lazy />);
    expect(getByTestId(TEST_ID).textContent).toBe("loading")
    await waitFor(() => expect(getByTestId(TEST_ID).textContent).toBe("hello"))
  })

  test('Solve immediately when the same Key is used', async () => {
    const {getByTestId, rerender} = render(<Lazy />);
    expect(getByTestId(TEST_ID).textContent).toBe("loading")

    await waitFor(() => {
      expect(getByTestId(TEST_ID).textContent).toBe("hello")

      rerender(<Lazy />)
      expect(getByTestId(TEST_ID).textContent).not.toBe("loading")
      expect(getByTestId(TEST_ID).textContent).toBe("hello")
    })
  })
})

describe('useSuspenseState', () => {
  const SuspenseComponent = () => {
    const [renderText, clearCache] = useSuspenseState(`test_render_key`, async () => new Promise<string>((resolve) => {
      setTimeout(() => resolve("hello"), 50);
    }))
    return (
      <div>
        <div data-testid={TEST_ID}>{renderText}</div>
        <button onClick={clearCache}>{"re-fetch"}</button>
      </div>
    )
  }

  const Lazy = () => {
    return (
      <Suspense fallback={<div data-testid={"fallbackid"}>{"loading"}</div>}>
        <SuspenseComponent />
      </Suspense>
    )
  }

  test('Suspense works correctly', async () => {
    const {getByTestId} = render(<Lazy />);
    expect(getByTestId("fallbackid").textContent).toBe("loading")
    await waitFor(() => expect(getByTestId(TEST_ID).textContent).toBe("hello"))
  })

  test('Reset cached promise results', async () => {
    const {getByTestId, getByRole, rerender} = render(<Lazy />);
    await waitFor(async () => {
      expect(getByTestId(TEST_ID).textContent).toBe("hello")

      getByRole("button").click()
      rerender(<Lazy />)
      expect(getByTestId("fallbackid").textContent).toBe("loading")

      await waitFor(() => {
        expect(getByTestId(TEST_ID).textContent).toBe("hello")
      })
    })
  })
})
