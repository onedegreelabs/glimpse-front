'use client';

import {useState, FormEvent} from 'react';
import styles from './EventRsvpContainer.module.scss';
import {applyEvent} from '@/hooks/swr/useEvents';
import {useMyProfile} from '@/hooks/swr/useProfiles';

interface InputValid {
  givenName: string;
  familyName: string;
  role: string;
  belong: string;
  experience: string;
  region: string;
  purpose: string;
}

export default function EventRsvpContainer() {
  const {data, error, isLoading} = useMyProfile();
  const [inputValid, setInputValid] = useState<InputValid>({
    givenName: '',
    familyName: '',
    role: '',
    belong: '',
    experience: '',
    region: '',
    purpose: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;
    if (value) {
      setInputValid(prevInputValid => ({...prevInputValid, [name]: 'valid'}));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const fd = new FormData(formElement);
    const data: Record<string, FormDataEntryValue | string[]> = {};
    data.interest = [];

    for (const [key, value] of fd.entries()) {
      if (!value) {
        setInputValid(prevInputValid => ({
          ...prevInputValid,
          [key]: 'invalid',
        }));
      }

      if (value === 'on') {
        const interest = key.split('-');
        data.interest.push(interest[0]);
      } else {
        data[key] = value;
      }
    }

    // applyEvent(eventId, data);
  }

  return (
    <form className={styles['rsvp']} onSubmit={handleSubmit}>
      <div className={styles['rsvp-container']}>
        <div className={styles['rsvp-title']}>
          <h1>Winter 2023 Party in NYC</h1>
          <p>Please answer this survey.</p>
        </div>
        <div className={styles['rsvp-required']}>Required *</div>
        <div className={styles['rsvp-input']}>
          <label>
            First Name (이름) <span> *</span>
          </label>
          <input
            type="text"
            value={data?.data?.givenName}
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.givenName]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Last Name (성) <span> *</span>
          </label>
          <input
            type="text"
            value={data?.data?.familyName}
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.familyName]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Email (이메일) <span> *</span>
          </label>
          <input
            type="text"
            value={data?.data?.email}
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.belong]}
            disabled
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Industry (산업군) <span> *</span>
          </label>
          <input
            type="text"
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.role]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Role (직군) <span> *</span>
          </label>
          <input
            type="text"
            value={data?.data?.role}
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.role]}
            disabled
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>Organization (소속)</label>
          <input
            type="text"
            value={data?.data?.belong}
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.belong]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>Experience (경력)</label>
          <input
            type="text"
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.experience]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>Location (거주지역)</label>
          <input
            type="text"
            value={data?.data?.region}
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.region]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>Purpose of Participation (참가 목적)</label>
          <input
            type="text"
            name="purpose"
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.region]}
          />
        </div>
        <div className={styles['rsvp-interest']}>
          <h2>Interest (관심사)</h2>
          <div className={styles['rsvp-checkbox-container']}>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="industry" name="industry-check" />
              <label htmlFor="industry">Industry</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="role" name="role-check" />
              <label htmlFor="role">Role</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="self-development" name="self-check" />
              <label htmlFor="self-development">Self-Development</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="hobby" name="hobby-check" />
              <label htmlFor="hobby">Hobby</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="networking" name="networking-check" />
              <label htmlFor="networking">Networking</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="career" name="career-check" />
              <label htmlFor="career">Career</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="skill" name="skill-check" />
              <label htmlFor="skill">Skill</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="leadership" name="leadership-check" />
              <label htmlFor="leadership">Leadership</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input
                type="checkbox"
                id="problem-solving"
                name="problem-check"
              />
              <label htmlFor="problem-solving">Problem Solving</label>
            </div>
          </div>
          <button>Submit</button>
        </div>
      </div>
    </form>
  );
}
