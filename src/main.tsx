import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root element in index.html')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/*!
 * Rika's portfolio: https://github.com/mazsola739/mazsola739
 * SPDX-FileCopyrightText: 2026 R. Rika
 * SPDX-License-Identifier: MIT
 *
 * The code is under the MIT License: you may learn from it and reuse it, as long as my name and the license
 * stay with it. Please don't present it, or the design and ideas behind it, as your own original work.
 * The photo and the illustrations (made with AI) are not under MIT (src/assets/LICENSE.md).
 */
