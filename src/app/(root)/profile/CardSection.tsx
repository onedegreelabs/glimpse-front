import Card from '@/components/ui/card';
import styles from './cardSection.module.scss';
import {ICombinedDataItem} from '@/types/profileType';

interface CardSectionsProps {
  cardSectionItems: ICombinedDataItem[];
  updateCard: (title: string, id: number, updatedContent: string) => void;
}

export default function CardSection({
  cardSectionItems,
  updateCard,
}: CardSectionsProps) {
  return (
    <>
      {cardSectionItems.map((section, index: number) => (
        <section key={index + 1} className={styles['card-section']}>
          <div className={styles['title']}>
            <span>{section.title}</span>
          </div>
          <div className={styles['content-wrapper']}>
            {section.cards.map((card, index) => (
              <Card
                key={`${section.title.toLowerCase()}-${index}`}
                height={card.height}
                width={card.width}
              >
                <div
                  className={
                    section.title === 'Connect'
                      ? styles['link-content']
                      : styles['content']
                  }
                >
                  {section.title === 'Connect' ? (
                    <>
                      {section.content.map((content, index) => (
                        <input
                          key={`connect-${index}`}
                          placeholder="link add..."
                          value={content.content || ''}
                          onChange={e =>
                            updateCard(
                              section.title,
                              content.id,
                              e.target.value
                            )
                          }
                        />
                      ))}
                    </>
                  ) : (
                    <textarea
                      placeholder={card.placeholder}
                      value={section.content[index].content || ''}
                      onChange={e =>
                        updateCard(
                          section.title,
                          section.content[index].id,
                          e.target.value
                        )
                      }
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
