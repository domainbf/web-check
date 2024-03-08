import React, { Component, ErrorInfo, ReactNode } from "react";
import styled from 'styled-components';
import Card from 'components/Form/Card';
import Heading from 'components/Form/Heading';
import colors from 'styles/colors';

interface Props {
  children: ReactNode;
  title?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

const ErrorText = styled.p`
  color: ${colors.danger};
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: null
  };

  // Catch errors in any components below and re-render with error message
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }


  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Card>
          { this.props.title && <Heading color={colors.primary}>{this.props.title}</Heading> }
          <ErrorText>该组件意外出错</ErrorText>
          <p>
            如果服务器的结果不是预期的，通常会发生这种情况。.
            检查日志以获取更多信息。如果您仍然遇到此问题，请发邮件获取帮助.
          </p>
          {
            this.state.errorMessage &&
            <details>
              <summary>错误详情</summary>
              <div>{this.state.errorMessage}</div>
            </details>
          }
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
