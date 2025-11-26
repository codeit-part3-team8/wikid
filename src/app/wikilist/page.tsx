'use client';

import SearchInput from '@/components/SearchInput/SearchInput';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import ListCard from '@/components/ListCard/ListCard';
import Pagination from '@/components/Pagination/Pagination';
import Header from '@/components/Header/Header';
import { tv } from 'tailwind-variants';
import Image from 'next/image';
import NoSearch from '@/assets/images/no-search.png';

interface Profile {
  id: number;
  name: string;
  image: string;
  city: string;
  nationality: string;
  job: string;
  code: string;
}

const dummyProfiles: Profile[] = [
  {
    id: 1,
    name: '김동욱',
    image: '',
    city: '서울',
    nationality: '대한민국',
    job: '개발자',
    code: 'user001',
  },
  {
    id: 2,
    name: '박지민',
    image: '',
    city: '부산',
    nationality: '대한민국',
    job: '디자이너',
    code: 'user002',
  },
  {
    id: 3,
    name: '이서준',
    image: '',
    city: '대구',
    nationality: '대한민국',
    job: 'PM',
    code: 'user003',
  },
  {
    id: 4,
    name: '최예린',
    image: '',
    city: '인천',
    nationality: '대한민국',
    job: '마케터',
    code: 'user004',
  },
  {
    id: 5,
    name: '류도현',
    image: '',
    city: '광주',
    nationality: '대한민국',
    job: '개발자',
    code: 'user005',
  },
  {
    id: 6,
    name: '안예섭',
    image: '',
    city: '대전',
    nationality: '대한민국',
    job: '퍼블리셔',
    code: 'user006',
  },
  {
    id: 7,
    name: '정혜림',
    image: '',
    city: '울산',
    nationality: '대한민국',
    job: '기획자',
    code: 'user007',
  },
  {
    id: 8,
    name: '손태윤',
    image: '',
    city: '제주',
    nationality: '대한민국',
    job: '데이터분석가',
    code: 'user008',
  },
  {
    id: 9,
    name: '장준호',
    image: '',
    city: '서울',
    nationality: '대한민국',
    job: 'AI연구원',
    code: 'user009',
  },
  {
    id: 10,
    name: '문예지',
    image: '',
    city: '부산',
    nationality: '대한민국',
    job: '백엔드 개발자',
    code: 'user010',
  },
  {
    id: 11,
    name: '오하늘',
    image: '',
    city: '대구',
    nationality: '대한민국',
    job: '프론트엔드 개발자',
    code: 'user011',
  },
  {
    id: 12,
    name: '배지우',
    image: '',
    city: '인천',
    nationality: '대한민국',
    job: 'UX리서처',
    code: 'user012',
  },
  {
    id: 13,
    name: '고민재',
    image: '',
    city: '광주',
    nationality: '대한민국',
    job: 'DevOps 엔지니어',
    code: 'user013',
  },
  {
    id: 14,
    name: '윤도현',
    image: '',
    city: '대전',
    nationality: '대한민국',
    job: 'QA 엔지니어',
    code: 'user014',
  },
  {
    id: 15,
    name: '서하준',
    image: '',
    city: '울산',
    nationality: '대한민국',
    job: '백엔드 개발자',
    code: 'user015',
  },
  {
    id: 16,
    name: '조아린',
    image: '',
    city: '제주',
    nationality: '대한민국',
    job: '프론트엔드 개발자',
    code: 'user016',
  },
  {
    id: 17,
    name: '김서윤',
    image: '',
    city: '서울',
    nationality: '대한민국',
    job: '디자이너',
    code: 'user017',
  },
  {
    id: 18,
    name: '정민수',
    image: '',
    city: '부산',
    nationality: '대한민국',
    job: '개발자',
    code: 'user018',
  },
  {
    id: 19,
    name: '박예진',
    image: '',
    city: '대구',
    nationality: '대한민국',
    job: 'PM',
    code: 'user019',
  },
  {
    id: 20,
    name: '황유진',
    image: '',
    city: '인천',
    nationality: '대한민국',
    job: '마케터',
    code: 'user020',
  },
];

// const BASE_URL = 'https://wikied-api.vercel.app/19-8';
const PAGE_SIZE = 3;

export default function WikiListPage() {
  const [search, setSearch] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>(dummyProfiles);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();
  const keywordFromUrl = searchParams.get('keyword') ?? '';

  // const fetchProfiles = async (name?: string): Promise<Profile[]> => {
  //   const response = await axios.get(`${BASE_URL}/profiles`, {
  //     params: {
  //       name: name || undefined,
  //     },
  //   });
  //   console.log(response.data);
  //   return response.data.list ?? [];
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    router.push(`/wikilist?keyword=${encodeURIComponent(search)}`);
    setPage(1);
  };

  // useEffect(() => {
  //   // fetchProfiles();
  //   fetchProfiles();
  // }, []);

  const filteredProfiles = keywordFromUrl
    ? profiles.filter((profile) => profile.name.includes(keywordFromUrl))
    : profiles;

  const startIndex = (page - 1) * PAGE_SIZE;
  const currentProfiles = filteredProfiles.slice(startIndex, startIndex + PAGE_SIZE);

  const wikiWrap = tv({
    base: 'flex flex-col justify-center items-center m-auto md:w-[860px] mt-[40px] sm:mt-[70px] lg:mt-[80px] ',
  });

  const searchStyle = tv({
    base: 'flex flex-col items-start  w-full gap-[16px]  mb-[40px] sm:mb-[100px] lg:mb-[57px] px-[20px]',
  });

  return (
    <div>
      <Header />
      <div className={wikiWrap()}>
        <div className={searchStyle()}>
          <SearchInput value={search} onChange={handleChange} onSubmit={handleSubmit} />
          <span className="text-grayscale-400 max-[680px]:text-sm">
            {keywordFromUrl ? (
              filteredProfiles.length === 0 ? (
                ''
              ) : (
                <>
                  "{keywordFromUrl}"님을 총
                  <span className="text-primary-200">&nbsp;{filteredProfiles.length}&nbsp;</span>명
                  찾았습니다.
                </>
              )
            ) : (
              '검색어를 입력해 주세요.'
            )}
          </span>
        </div>
        <section className="mb-[54px] flex h-[466px] w-full max-w-[860px] flex-col gap-[24px] px-[24px] md:mb-[81px] md:h-[474px] md:px-[24px] lg:mb-[121px]">
          {filteredProfiles.length <= 0 ? (
            <div className="text-grayscale-400 flex flex-col items-center justify-center gap-[32px] py-[60px]">
              <span className="text-md">"{keywordFromUrl}"과 일치한 검색 결과가 없습니다.</span>
              <Image
                className="h-[108px] w-[108px] md:h-[144px] md:w-[144px]"
                src={NoSearch}
                alt="검색결과 없음 이미지"
              />
            </div>
          ) : (
            currentProfiles.map((profile) => (
              <ListCard
                key={profile.id}
                image={profile.image}
                name={profile.name}
                city={profile.city}
                nationality={profile.nationality}
                job={profile.job}
              />
            ))
          )}
        </section>
        <div className="mb-[35px] md:mb-[229px] lg:mb-[136px]">
          <Pagination
            currentPage={page}
            totalCount={filteredProfiles.length}
            setPage={setPage}
            viewCount={PAGE_SIZE}
          />
        </div>
      </div>
    </div>
  );
}
