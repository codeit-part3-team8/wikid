import Image from 'next/image';
import homeBg from '@/assets/images/home-bg.png';
import writeSection from '@/assets/images/write-section.png';
import shareSocial from '@/assets/images/share-social.png';
import shareSection from '@/assets/images/share-section.png';
import shareLink from '@/assets/images/share-link.png';
import shareMessage from '@/assets/images/share-message.png';
import shareChat from '@/assets/images/share-chat.png';
import shareExtra from '@/assets/images/share-extra.png';
import viewSection from '@/assets/images/view-section.png';
import bellIcon from '@/assets/images/bell-icon.png';
import ctaSection from '@/assets/images/cta-section.png';
import leftBlock from '@/assets/images/left-block.png';
import rightBlock from '@/assets/images/right-block.png';
import ActionButton from '@/components/Button/LandingButton/LandingButton';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="relative flex flex-col items-center justify-between">
        <div className="mt-[120px] mb-[100px] flex flex-col text-center sm:mb-[150px] lg:mb-[193px]">
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[15px]">
              <span className="responsive-text-nx nx-60-to-40-light text-grayscale-500">
                남들이 만드는
              </span>
              <span className="responsive-text-nx nx-90-to-60-bold text-grayscale-500">
                나만의 위키
              </span>
            </div>
            <ActionButton
              to="/wikicreate"
              className="responsive-text-nx nx-24-to-20-bold bg-grayscale-500 hover:bg-grayscale-400 text-grayscale-50 m-auto w-fit rounded-[15px] px-[30px] py-[15px]"
            >
              위키 만들기
            </ActionButton>
          </div>
          <Image
            src={writeSection}
            alt="위키만들기 이미지"
            className="h-[398px] w-[336px] sm:h-[590px] sm:w-[498px]"
          />
        </div>
        <div className="mb-[100px] flex justify-center gap-[10px] sm:mb-[160px] sm:gap-[20px] lg:mb-[200px] lg:gap-[40px]">
          <div className="flex flex-col justify-between gap-[30px] sm:gap-[40px] lg:gap-[60px]">
            <div className="flex flex-col gap-[10px] sm:gap-[20px]">
              <span className="responsive-text-nx nx-30-20-10-bold text-primary-200">WRITE</span>
              <span className="responsive-text-nx nx-50-32-16-regular text-grayscale-50">
                친구의 위키,
                <br />
                직접 작성해 봐요.
              </span>
            </div>
            <div className="bg-primary-200 flex items-center justify-center rounded-2xl">
              <Image
                src={shareSocial}
                alt="home share social 이미지"
                className="-ml-5 h-[162px] w-[133px] object-contain sm:h-[322px] sm:w-[262px] lg:h-[450px] lg:w-[364px]"
              />
            </div>
          </div>
          <Image
            src={shareSection}
            alt="share section 이미지"
            className="h-[250px] w-[192px] sm:h-[479px] sm:w-[365px] lg:h-[681px] lg:w-[520px]"
          />
        </div>
        <Image src={homeBg} alt="홈 배경 이미지" className="absolute bottom-0 -z-[99] h-[67%]" />
      </section>
      <section>
        <div className="mt-[100px] sm:mt-[160px] lg:mt-[200px]">
          <div className="m-auto mr-[28%] mb-[40px] flex w-fit flex-col items-end px-[20px] max-[1280px]:mr-0 sm:mb-[80px] sm:px-[48px] lg:mb-[120px] xl:mr-[25%]">
            <span className="responsive-text-nx nx-30-20-10-bold text-primary-200">SHARE</span>
            <span className="responsive-text-nx nx-50-32-16-regular text-grayscale-500 text-end">
              내 위키 만들고
              <br /> 친구에게 공유해요
            </span>
          </div>

          <div className="relative m-auto mb-[200px] w-full overflow-hidden px-[20px] sm:px-[48px] 2xl:px-[70px]">
            <div className="flex items-center justify-center gap-[10px] sm:gap-[20px] md:gap-[20px] lg:gap-[70px]">
              {/* Left Block - 왼쪽으로 잘림*/}
              <div className="relative -ml-[120px] aspect-square w-full max-w-[360px] sm:-ml-[160px] md:-ml-[220px]">
                <Image
                  fill
                  className="min-h-[76px] min-w-[76px] rounded-[25px] bg-[#B2A5FD] object-cover"
                  src={leftBlock}
                  alt="left block 이미지"
                />
              </div>

              {/* Share Link */}
              <div className="relative aspect-square w-full max-w-[360px]">
                <Image
                  fill
                  className="min-h-[76px] min-w-[76px] rounded-[25px] bg-[#B2A5FD] object-cover"
                  src={shareLink}
                  alt="share link 이미지"
                />
              </div>

              {/* Share Message */}
              <div className="relative aspect-square w-full max-w-[360px]">
                <Image
                  fill
                  className="min-h-[76px] min-w-[76px] rounded-[25px] bg-[#ADEDDE] object-cover"
                  src={shareMessage}
                  alt="share message 이미지"
                />
              </div>

              {/* Share Chat */}
              <div className="relative aspect-square w-full max-w-[360px]">
                <Image
                  fill
                  className="min-h-[76px] min-w-[76px] rounded-[25px] bg-[#DEE5F5] object-cover"
                  src={shareChat}
                  alt="share chat 이미지"
                />
              </div>

              {/* Share Extra */}
              <div className="relative aspect-square w-full max-w-[360px]">
                <Image
                  fill
                  className="min-h-[76px] min-w-[76px] rounded-[25px] bg-[#DEE5F5] object-cover"
                  src={shareExtra}
                  alt="share extra 이미지"
                />
              </div>

              {/* Right Block - 오른쪽으로 잘림 */}
              <div className="relative -mr-[120px] aspect-square w-full max-w-[360px] sm:-mr-[160px] md:-mr-[220px]">
                <Image
                  fill
                  className="min-h-[76px] min-w-[76px] rounded-[25px] bg-[#B2A5FD] object-cover"
                  src={rightBlock}
                  alt="right block 이미지"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="m-auto max-w-[924px] bg-[#ECF0FA] px-[20px] pt-[130px] pb-[100px] sm:px-[48px] sm:pt-[180px] sm:pb-[160px] lg:mb-[200px] lg:bg-transparent lg:px-[0] lg:pt-0 lg:pb-0">
        <div className="mb-[40px] flex flex-col items-start sm:mb-[80px] lg:mb-[120px]">
          <span className="responsive-text-nx nx-30-20-10-bold text-primary-200">VIEW</span>
          <span className="responsive-text-nx nx-50-32-16-regular text-grayscale-500 text-start">
            친구들이 달아준
            <br />
            내용을 확인해 봐요
          </span>
        </div>
        <div className="m-auto flex flex-col gap-[10px] sm:gap-[22px] lg:gap-[40px]">
          <Image src={viewSection} alt="viewSection 이미지" className="w-full" />
          <div className="grid w-full grid-cols-3 gap-[10px] sm:gap-[22px] lg:gap-[40px]">
            <div className="relative col-span-1 aspect-square max-w-[280px]">
              <Image
                src={bellIcon}
                alt="bellIcon 이미지"
                fill
                className="rounded-[16px] bg-[#8E66FF] object-cover"
              />
            </div>
            <div className="relative col-span-2">
              <Image
                src={ctaSection}
                alt="ctaSection 이미지"
                fill
                className="rounded-[16px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-grayscale-500 flex h-[329px] flex-col items-center justify-center gap-[40px] sm:h-[488px] lg:h-[568px]">
        <h1 className="responsive-text-nx nx-60-to-30-bold text-grayscale-50">
          나만의 위키 만들어 보기
        </h1>
        <ActionButton
          to="/wiki/{code}"
          className="responsive-text-nx nx-24-to-20-bold text-grayscale-500 bg-grayscale-50 hover:text-grayscale-50 cursor-pointer rounded-[16px] px-[30px] py-[15px] transition duration-300 hover:bg-gray-500"
        >
          지금 시작하기
        </ActionButton>
      </section>
      <footer className="flex flex-col items-start gap-[20px] bg-[#3B415B] px-[20px] py-[40px] sm:gap-[30px] sm:py-[60px] sm:pl-[48px] lg:py-[80px] lg:pl-[80px]">
        <div className="flex flex-col">
          <span className="responsive-text text-lg-to-xxs text-grayscale-50 mb-[10px]">
            Copyright ⓒ Wikied. All Rights Reserved
          </span>
          <span className="responsive-text text-md-to-xxss text-grayscale-50">
            사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은
          </span>
          <span className="responsive-text text-md-to-xxss text-grayscale-50">
            서울특별시 중구 청계천로 123, 위키드빌딩
          </span>
        </div>
        <div className="flex gap-[15px] sm:gap-[30px]">
          <span className="responsive-text text-md-to-xxss-semibold text-grayscale-50">
            서비스 이용약관
          </span>
          <span className="responsive-text text-md-to-xxss-semibold text-grayscale-50">
            개인정보 취급방침
          </span>
          <span className="responsive-text text-md-to-xxss-semibold text-grayscale-50">
            전자금융거래 기본약관
          </span>
        </div>
      </footer>
    </div>
  );
}
