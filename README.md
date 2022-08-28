<div style="text-align: center;">
  <h1>use-suspense-hook</h1>
</div>

<div style="text-align: center;">
<a href="https://github.com/sskmy1024y/use-suspense-hook/releases/latest"><img src="https://img.shields.io/npm/v/use-suspense-hook" alt="Released package version"></a>
<a href="https://github.com/sskmy1024y/use-suspense-hook/blob/main/license"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT"></a>
<a href="https://github.com/sskmy1024y/use-suspense-hook/actions/workflows/test.yml"><img src="https://github.com/sskmy1024y/use-suspense-hook/actions/workflows/test.yml/badge.svg" alt="CI status" /></a> 
</div>

<br>

<div style="text-align: center;">
  <strong>Hooks that allow synchronous execution of Async functions via React.Suspension</strong>
</div>

## 📦 Install

```shell
$ npm install use-suspense-hook
```


```shell
$ yarn add use-suspense-hook
```

## 📔 Usage

```tsx
// This component is loaded dynamically
const OtherComponent: React.FC = () => {
  const result = useSuspenseValue(`unique-key`, async () => {
    // Asynchronous processing such as data fetching
    return await asyncFunction()
  })
  
  return (
    <div>{result}</div>
  )
}

function MyComponent() {
  return (
      // Displays <Spinner> until OtherComponent loads
      <React.Suspense fallback={<Spinner />}>
        <div>
          <OtherComponent />
        </div>
      </React.Suspense>
  );
}
```

## 🤝 Contributing

1. Fork it ( <https://github.com/sskmy1024y/use-suspense-hook/fork> )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## 🎫 Licence

The MIT License (MIT)

* Copyright (c) 2022 sskmy1024y

## 🖋 Author

* [sskmy1024y](https://github.com/sskmy1024y)
