"use client"
import React, { ReactNode } from "react";

type ErrorBoundaryProps={
    children:ReactNode;
}
type ErrorBoundaryState={
hasError:boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps,ErrorBoundaryState> {
    constructor(props:ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    }
   
   static getDerivedStateFromError(error:Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
   }
   
   componentDidCatch(error:Error, errorInfo:React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
   }
   handleRetryClick = () => {
    window.location.reload();
  };
   
   render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div><h1>Something went wrong.</h1>
      <button onClick={this.handleRetryClick}>Retry</button></div>;
     }
   
     return this.props.children;
    }
   }
   