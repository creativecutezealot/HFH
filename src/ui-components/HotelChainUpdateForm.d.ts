/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { HotelChain } from '../models';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { GridProps, SelectFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type HotelChainUpdateFormInputValues = {
  name?: string;
  status?: string;
};
export declare type HotelChainUpdateFormValidationValues = {
  name?: ValidationFunction<string>;
  status?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HotelChainUpdateFormOverridesProps = {
  HotelChainUpdateFormGrid?: FormProps<GridProps>;
  name?: FormProps<TextFieldProps>;
  status?: FormProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type HotelChainUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: HotelChainUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    hotelChain?: HotelChain;
    onSubmit?: (fields: HotelChainUpdateFormInputValues) => HotelChainUpdateFormInputValues;
    onSuccess?: (fields: HotelChainUpdateFormInputValues) => void;
    onError?: (fields: HotelChainUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: HotelChainUpdateFormInputValues) => HotelChainUpdateFormInputValues;
    onValidate?: HotelChainUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function HotelChainUpdateForm(props: HotelChainUpdateFormProps): React.ReactElement;
