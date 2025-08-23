import noImage from '../assets/images/noImage.jpg';

export default function Posts() {
  return (
    <section className="posts-page">
      <ul className="posts" style={{ listStyleType: 'none' }}>
        <li className="post-wrapper">
          <div>
            <p className="name">By Robb</p>
            <p className="date">Posted: 2025-08-18</p>
            <div className="post">
              <div className="container-one">
                <div className="logo-container">
                  <img src={noImage} className="logo" alt="No image" />
                </div>
                <h3 className="topic">Topic number One</h3>
              </div>
              <p className="post-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus numquam minus eius reprehenderit corporis veniam nisi
                impedit illum quasi facilis amet aut aspernatur quidem, odit, id
                esse enim. Ipsum, veniam! Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Quos assumenda, laudantium officia
                fugiat, quibusdam repudiandae et sint consequuntur id totam
                dolorum, explicabo eveniet eligendi enim tempora. Iste
                accusantium perspiciatis possimus? Fuga aliquam cupiditate
                veniam esse asperiores minus distinctio quidem maxime, optio
                quos facere magnam molestias ipsum nisi iste fugit eveniet
                officiis quo eligendi. Quidem distinctio sequi natus dolore,
                voluptatibus quos! Sunt at incidunt neque. Ut corrupti
                blanditiis cum officia accusantium molestias consequuntur ipsam
                quaerat error assumenda distinctio mollitia, repudiandae sequi
                quia unde amet adipisci pariatur soluta ratione sunt cumque
                tempore. Nostrum adipisci quas exercitationem blanditiis magni
                minus consectetur, incidunt molestias quaerat recusandae odit
                deserunt maxime, ipsa, inventore expedita. Unde iste autem
                consequatur dolores a facilis ipsam rerum reiciendis! Iste,
                reiciendis! Enim nihil delectus adipisci incidunt laudantium
                unde harum voluptate, repellendus porro itaque, corrupti
                temporibus nobis rem molestiae eos eius dolorum obcaecati. Quam
                voluptate soluta doloribus earum quibusdam, eligendi itaque
                iusto. Ducimus assumenda eum, esse nulla natus commodi expedita
                magni voluptates cum fugiat, deleniti libero placeat? Labore
                sequi dolor, accusantium rerum earum nostrum architecto debitis
                voluptatibus quam, porro, aliquid voluptatem dignissimos! Minima
                quibusdam doloremque enim sit, quod harum dolore similique fuga
                excepturi vitae tempore obcaecati iure inventore dicta!
                Inventore recusandae nulla odio quia, facilis corporis dolores,
                optio ratione nihil quos in! Aperiam, excepturi fuga tempora
                aliquam impedit non officia accusamus odio, doloribus
                consectetur aspernatur saepe! Et recusandae ratione velit
                aspernatur reiciendis odio distinctio nostrum quibusdam cumque
                dignissimos! Dolorem eveniet temporibus reprehenderit. Expedita,
                officiis? Quibusdam, quos quaerat sequi veniam cum architecto.
                Neque, corporis harum quaerat, ab voluptatibus numquam accusamus
                iste aut adipisci laudantium molestias! Ea, quo ipsa amet sequi
                animi sit odit. Laboriosam minima doloribus ipsam omnis
                necessitatibus autem reprehenderit eligendi magni? Nemo ipsum,
                quas quam consectetur ea laudantium debitis vero, totam est
                facilis illo veniam excepturi ab praesentium nostrum sequi sint.
              </p>
            </div>
          </div>
          <div className="trashcan"></div>
        </li>
        <li className="post-wrapper">
          <div>
            <p className="name">By Sam</p>
            <p className="date">Posted: 2025-08-18</p>
            <div className="post">
              <div className="container-one">
                <div className="logo-container">
                  <img src={noImage} className="logo" alt="No image" />
                </div>
                <h3 className="topic">Topic number Two</h3>
              </div>
              <p className="post-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus numquam minus eius reprehenderit corporis veniam nisi
                impedit illum quasi facilis amet aut aspernatur quidem, odit, id
                esse enim. Ipsum, veniam!
              </p>
            </div>
          </div>
          <div className="trashcan"></div>
        </li>
      </ul>
    </section>
  );
}
