import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/reviews/reviewsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditReviews = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    content: '',

    review_date: new Date(),

    customer: '',

    vendor: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { reviews } = useAppSelector((state) => state.reviews);

  const { reviewsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: reviewsId }));
  }, [reviewsId]);

  useEffect(() => {
    if (typeof reviews === 'object') {
      setInitialValues(reviews);
    }
  }, [reviews]);

  useEffect(() => {
    if (typeof reviews === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = reviews[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [reviews]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: reviewsId, data }));
    await router.push('/reviews/reviews-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit reviews')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit reviews'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Content' hasTextareaHeight>
                <Field
                  name='content'
                  id='content'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='ReviewDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.review_date
                      ? new Date(
                          dayjs(initialValues.review_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, review_date: date })
                  }
                />
              </FormField>

              <FormField label='Customer' labelFor='customer'>
                <Field
                  name='customer'
                  id='customer'
                  component={SelectField}
                  options={initialValues.customer}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Vendor' labelFor='vendor'>
                <Field
                  name='vendor'
                  id='vendor'
                  component={SelectField}
                  options={initialValues.vendor}
                  itemRef={'vendors'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/reviews/reviews-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditReviews.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_REVIEWS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditReviews;
