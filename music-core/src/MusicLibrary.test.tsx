// music-core/src/__tests__/Simple.test.tsx
import { render, screen } from '@testing-library/react';

const Simple = () => <h1>Hello Test</h1>;

test('renders hello', () => {
  render(<Simple />);
  expect(screen.getByText('Hello Test')).toBeInTheDocument();
});
