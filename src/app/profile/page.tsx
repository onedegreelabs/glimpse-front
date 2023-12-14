import Card from '@/components/Card/page';
import CircleImage from './components/CircleImage/page';
import styles from './page.module.scss';
import Image from 'next/image';

export default function Profile() {
  return (
    <div className={styles['profile-container']}>
      <section className={styles['profile-section']}>
        <div className={styles['profile-image-wrapper']}>
          <div>
            <CircleImage
              src="/assets/profile/caret-left.svg"
              alt="뒤로가기"
              width={32}
              height={32}
              isAbsolute={false}
            />
          </div>
          <div className={styles['profile-image']}>
            <Image
              src="/assets/profile/profile.png"
              alt="프로필사진"
              width={120}
              height={120}
            />
            <CircleImage
              src="/assets/profile/image.svg"
              alt="프로필이미지 업로드"
              width={20}
              height={20}
              isAbsolute={true}
            />
          </div>
          <div>
            <CircleImage
              src="/assets/profile/share-box.svg"
              alt="공유버튼"
              width={20}
              height={20}
              isAbsolute={false}
            />
          </div>
        </div>
        <div className={styles['profile-info-wrapper']}>
          <p className={styles['name']}>James Dean</p>
          <p>한줄 자기소개</p>
          <div className={styles['company-wrapper']}>
            <p>직군</p>
            <p className={styles['divider']}>|</p>
            <p>회사이름</p>
          </div>
          <p>Seoul, South Korea</p>
        </div>
      </section>
      <section className={styles['intro-section']}>
        <div className={styles['title']}>
          <span>Intro</span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={168} width={168}>
            <div className={styles['content']}>
              <textarea placeholder="add title..." />
            </div>
          </Card>
          <Card height={168} width={168}>
            <div className={styles['content']}>
              <textarea placeholder="add title..." />
            </div>
          </Card>
        </div>
      </section>
      <section className={styles['about-me-section']}>
        <div className={styles['title']}>
          <span>About me</span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={168} width={358}>
            <div className={styles['content']}>
              <textarea placeholder="Write down what you want to say..." />
            </div>
          </Card>
        </div>
      </section>
      <section className={styles['connect-section']}>
        <div className={styles['title']}>
          <span>Connect</span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={64} width={358}>
            <div className={styles['link-content']}>
              <div />
              <input placeholder="link add..." />
            </div>
          </Card>
        </div>
      </section>
      <section className={styles['hashtag-section']}>
        <div className={styles['title']}>
          <span> Hashtag of interest </span>
        </div>
        <div className={styles['content-wrapper']}>
          <Card height={358} width={358}>
            <div className={styles['content']}>
              <textarea placeholder="Add your interests..." />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
