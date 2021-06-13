import React from 'react';
import { createContext, useContext } from "react";

export const I18nContext = createContext({})

export default function I18nProvider(props) {
  return (
    <I18nContext.Provider value={props.i18n}>
      {props.children}
    </I18nContext.Provider>
  )
} 

export function withI18n(Component) {
  return (props) => {
    const i18n = useContext(I18nContext);
    return (
      <Component
        i18n={i18n}
        {...props}
      />
    )
  }
}