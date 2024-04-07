'use client';

import {useState, FormEvent} from 'react';
import styles from './index.module.scss';

interface InputValid {
  firstName: string;
  lastName: string;
  role: string;
  organization: string;
  experience: string;
  location: string;
}

export default function EventRsvpContainer() {
  const [inputValid, setInputValid] = useState<InputValid>({
    firstName: '',
    lastName: '',
    role: '',
    organization: '',
    experience: '',
    location: '',
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
    const data: Record<string, FormDataEntryValue> = {};

    for (const [key, value] of fd.entries()) {
      data[key] = value;
      if (!value) {
        setInputValid(prevInputValid => ({
          ...prevInputValid,
          [key]: 'invalid',
        }));
      }
    }

    console.log(data);

    /* 받아온 데이터 서버에 보내기.
    async function sendData(data: Record<string, FormDataEntryValue>) {
      try {
        const response = await fetch('url', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('data를 전송하는데 실패하였습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    }

    sendData(data); */
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
            name="firstName"
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.firstName]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Last Name (성) <span> *</span>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.lastName]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Role (직군) <span> *</span>
          </label>
          <input
            type="text"
            name="role"
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.role]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Organization (소속) <span> *</span>
          </label>
          <input
            type="text"
            name="organization"
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.organization]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Experience (경력) <span> *</span>
          </label>
          <input
            type="text"
            name="experience"
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.experience]}
          />
        </div>
        <div className={styles['rsvp-input']}>
          <label>Location (거주지역)</label>
          <input
            type="text"
            name="location"
            placeholder="Place holder"
            onChange={handleChange}
            className={styles[inputValid.location]}
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
