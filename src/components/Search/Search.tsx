import { Button, Flex, Form, Grid, Input, Radio, RadioChangeEvent, Row, Slider, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import styles from '@/components/Search/Search.module.sass'
import { useState } from 'react';
import form from 'antd/es/form';

type fieldType = {
  'search': string,
  'type'?: string,
  'year'?: number,
}

export default function Search() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const [isYear, setIsYear] = useState(true)
  
  const today = new Date();

  const handleDisableYear = (value: boolean) => {
    if(!value){
      params.delete('year')
      push(`${pathname}?${params.toString()}`)
    }
    setIsYear(!value)
  }

  const handleBigSearch = (values: fieldType) => {
    for(let field in values){
      const value = values[field as keyof fieldType] // === undefined ? '' : String(values[field as keyof fieldType])
      if(value !== undefined){
        params.set(field, value.toString())
      }
    }
    if(!isYear){
      params.delete('year')
    }
    push(`${pathname}?${params.toString()}`)
  }

  
  return (
    <Form 
      className={styles.search}
      autoComplete="off"
      onFinish={handleBigSearch}
      // initialValues={{requiredMark}}
    >
      <Form.Item<fieldType>
        name='search' 
        label='Название' 
        initialValue={searchParams.get('search')?.toString()}
        rules={[{
          required: true, 
          message: "Обязательное поле"
        },
        {
          min: 3,
          message: "От 3 символов"
        }]}
      >
        <Input 
          placeholder='найти' 
          minLength={3}
          prefix={<SearchOutlined />}
          // onChange={(e) => handleSearch(e.target.value)}
        />
      </Form.Item >

      <Flex gap='small' align='left' justify='space-between'>
        <Form.Item<fieldType> 
          preserve={false}
          name='year' 
          label='Год выпуска' 
          initialValue={searchParams.get('year')?.toString()}
          className={styles.slider}
        >
          <Slider 
            disabled={!isYear}
            // onChange={setMovieYearFilter}
            min={1870}
            max={today.getFullYear()}
          />
        </Form.Item >
        <div>
          Исключить год из поиска: <Switch size='small' checked={!isYear} onChange={handleDisableYear}/>
        </div>
      </Flex>  

      <Form.Item<fieldType> name='type' label='Тип' initialValue={searchParams.get('type')?.toString()}>
        <Radio.Group 
          // onChange={setMovieTypeFilter} 
        >
          <Radio.Button value={'series'}>Сериалы</Radio.Button>
          <Radio.Button value={'movies'}>Фильмы</Radio.Button>
        </Radio.Group>
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};


// const handleSearch = useDebouncedCallback((term: string) => {
//   if (term.length > 2) {
//     params.set('search', term);
//   } else {
//     params.delete('search');
//   }
//   push(`${pathname}?${params.toString()}`);
// }, 300)


// const setMovieTypeFilter = (e: RadioChangeEvent) => {
//   const type = e.target.value
//   // const params = new URLSearchParams(searchParams);
//   params.set('type', type);
//   replace(`${pathname}?${params.toString()}`);
// }


// const setMovieYearFilter = useDebouncedCallback((year: number) => {
//   // const params = new URLSearchParams(searchParams);
//   params.set('year', String(year));
//   replace(`${pathname}?${params.toString()}`);
// }, 300)