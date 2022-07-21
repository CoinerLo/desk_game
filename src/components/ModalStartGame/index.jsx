import { useForm } from 'react-hook-form';
import styles from './modalStartGame.module.scss';

const ModalStartGame = ({ setIsOpenStartGame, addNewGame }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      radio: '2'
    }
  });

  const sendFormData = (data) => {
    const { radio } = data;
    addNewGame({ maxPlayers: radio });
    console.log(radio);
  }

  return (
    <div className={styles.modalStartGame}>
      <div className={styles.modalStartGame_content}>
        <button
          className={styles.modalStartGame_close}
          onClick={()=> setIsOpenStartGame(false)}
        >X
        </button>
        <h1>Выберите опции для старта</h1>
        <form
          onSubmit={handleSubmit(sendFormData)}
          className={styles.modalStartGame_form}
        >
          <fieldset className={styles.modalStartGame_form__numberOfPlayers}>
            <legend>Выберите колличество противников</legend>
            <div className={styles.modalStartGame_form__numberOfPlayers_inp}>
              <div>
                <input
                  type='radio'
                  {...register("radio")}
                  id='onePlayer'
                  value='2'
                />
                <label htmlFor='onePleay'>Один противник</label>
              </div>
              <div>
                <input
                  type='radio'
                  {...register("radio")}
                  id='twoPlayer'
                  value='3'
                />
                <label htmlFor='twoPlayer'>Два противника</label>
              </div>
              <div>
                <input
                  type='radio'
                  {...register("radio")}
                  id='threePlayer' 
                  value='4'
                />
                <label htmlFor='threePlayer'>Три противника</label>
              </div>
              <div>
                <input
                  type='radio'
                  {...register("radio")}
                  id='fourPlayer'
                  value='5'
                />
                <label htmlFor='fourPlayer'>Четыре противника</label>
              </div>
            </div>
            <button
              type='submit'
              className={styles.modalStartGame_content_start}
            >
              В атаку!
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ModalStartGame;
