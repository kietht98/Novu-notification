import styled from '@emotion/styled';
import { SegmentProvider } from '../components/providers/SegmentProvider';
import { ThemeProvider } from '../design-system/ThemeProvider';

export function TestWrapper({ children }) {
  return (
    <SegmentProvider>
      <Wrapper>
        <Frame>
          <ThemeProvider>{children}</ThemeProvider>
        </Frame>
      </Wrapper>
    </SegmentProvider>
  );
}

const Frame = styled.div`
  min-width: 500px;
  display: inline-block;
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
