import { Input, Radio, RadioChangeEvent, Slider } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import styles from '@/components/Search/Search.module.sass'

export default function Search() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams);

  const pathname = usePathname();
  const { replace, push,  } = useRouter();
  const today = new Date();


  const handleSearch = useDebouncedCallback((term: string) => {
    if (term.length > 2) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)


  const setMovieTypeFilter = (e: RadioChangeEvent) => {
    const type = e.target.value
    // const params = new URLSearchParams(searchParams);
    params.set('type', type);
    push(`${pathname}?${params.toString()}`);
  }


  const setMovieyearFilter = useDebouncedCallback((year: number) => {
    // const params = new URLSearchParams(searchParams);
    params.set('year', String(year));
    push(`${pathname}?${params.toString()}`);
  }, 300)

  
  return (
    <div className={styles.search}>
      <Input 
        placeholder='найти' 
        prefix={<SearchOutlined />}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
      <div className={styles.filters}>
        <Radio.Group 
          onChange={setMovieTypeFilter} 
          value={searchParams.get('type')?.toString()}
        >
          <Radio value={'series'}>series</Radio>
          <Radio value={'movies'}>movies</Radio>
        </Radio.Group>
        <Slider 
          onChange={setMovieyearFilter}
          className={styles.slider}
          defaultValue={1999} 
          // tooltip={{open: true}}
          min={1870}
          max={today.getFullYear()}
        />
      </div>

    </div>
  );
};
