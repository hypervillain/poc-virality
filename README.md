# Poc Virality

An example library of Prismic slices that you can install from `slicemachine`.

## Installation

Run this command from a working Next project (or run `npx create-next-app` first):

```bash
npx installer-package-poc-virality --lib hypervillain/poc-virality
````

This will create a `poc-virality` folder in your project, install required dependencies and update your slicemachine manifest file (sm.json).

## Next steps

Additional steps to make poc-virality work with your project.

### Install Tailwind

Tailwind is required. If your project is not configured yet, please follow their [Next.js documentation](https://tailwindcss.com/docs/guides/nextjs)!

### Run Slicemachine

Launch Slicemachine from the CLI (usually `npm run slicemachine`). In the Slices folder, you should now see the `poc-virality` library. Pick the `CallToAction` Slice and make some changes. Click save: a new mock will be generated in folder `.slicemachine`.

### Update pages/index.js

```javascript
import fs from 'fs'
import { CallToAction } from '../poc-virality/slices'

export default function Page(props) {
  return (
    <div>
      <CallToAction slice={props.slices[0]} />
    </div>
  )
}

// .slicemachine/assets/poc-virality/slices/CallToAction
export function getStaticProps() {
  // In reality this should use a helper function
  const ctaMocks = JSON.parse(fs.readFileSync('.slicemachine/assets/poc-virality/slices/CallToAction/mocks.json', 'utf-8'))
  return {
    props: {
      slices: [ctaMocks[0]]
    }
  }
}
````

### Run your Next project

✌️