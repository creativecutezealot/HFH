/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react';
import { fetchByPath, validateField } from './utils';
import { HotelBrand } from '../models';
import { getOverrideProps } from '@aws-amplify/ui-react/internal';
import { Button, Flex, Grid, SelectField, TextField } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
export default function HotelBrandUpdateForm(props) {
  const {
    id,
    hotelBrand,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: undefined,
    status: undefined,
    logo: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [status, setStatus] = React.useState(initialValues.status);
  const [logo, setLogo] = React.useState(initialValues.logo);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...hotelBrandRecord };
    setName(cleanValues.name);
    setStatus(cleanValues.status);
    setLogo(cleanValues.logo);
    setErrors({});
  };
  const [hotelBrandRecord, setHotelBrandRecord] = React.useState(hotelBrand);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(HotelBrand, id) : hotelBrand;
      setHotelBrandRecord(record);
    };
    queryData();
  }, [id, hotelBrand]);
  React.useEffect(resetStateValues, [hotelBrandRecord]);
  const validations = {
    name: [],
    status: [],
    logo: [],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          status,
          logo,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) => runValidationTasks(fieldName, item))
              );
              return promises;
            }
            promises.push(runValidationTasks(fieldName, modelFields[fieldName]));
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(
            HotelBrand.copyOf(hotelBrandRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, 'HotelBrandUpdateForm')}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        defaultValue={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              status,
              logo,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks('name', value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks('name', name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, 'name')}
      ></TextField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              status: value,
              logo,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks('status', value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks('status', status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, 'status')}
      >
        <option
          children="Draft"
          value="DRAFT"
          {...getOverrideProps(overrides, 'statusoption0')}
        ></option>
        <option
          children="Pending"
          value="PENDING"
          {...getOverrideProps(overrides, 'statusoption1')}
        ></option>
        <option
          children="Active"
          value="ACTIVE"
          {...getOverrideProps(overrides, 'statusoption2')}
        ></option>
        <option
          children="Archived"
          value="ARCHIVED"
          {...getOverrideProps(overrides, 'statusoption3')}
        ></option>
      </SelectField>
      <TextField
        label="Logo"
        isRequired={false}
        isReadOnly={false}
        defaultValue={logo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              status,
              logo: value,
            };
            const result = onChange(modelFields);
            value = result?.logo ?? value;
          }
          if (errors.logo?.hasError) {
            runValidationTasks('logo', value);
          }
          setLogo(value);
        }}
        onBlur={() => runValidationTasks('logo', logo)}
        errorMessage={errors.logo?.errorMessage}
        hasError={errors.logo?.hasError}
        {...getOverrideProps(overrides, 'logo')}
      ></TextField>
      <Flex justifyContent="space-between" {...getOverrideProps(overrides, 'CTAFlex')}>
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, 'CancelButton')}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
