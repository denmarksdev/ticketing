const doRequest = async (ord) => {
  let ticket = {
    title: "movie_" + ord,
    price: 10,
  };

  const response = await fetch("http://ticketing.dev/api/tickets", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Cookie:
        "session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkwTkdZeU9XRmhPVE5pWlRFMllUSmpaamhoTkdabE1pSXNJbVZ0WVdsc0lqb2lkR1Z6ZEdWQWRHVnpkQzVqYjIwaUxDSnBZWFFpT2pFMk9ESTVNRGsyTVROOS51NV9xdklJSlJXWTdYZzNkbjVQMWs0Rm13dFFVVUVnZE1GaWIxY2hIejFrIn0=; Path=/; Secure; HttpOnly; Domain=ticketing.dev",
    },
    body: JSON.stringify(ticket),
  });

  ticket = await response.json();
  ticket.price = 15;

  fetch("http://ticketing.dev/api/tickets/" + ticket.id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Cookie:
        "session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkwTkdZeU9XRmhPVE5pWlRFMllUSmpaamhoTkdabE1pSXNJbVZ0WVdsc0lqb2lkR1Z6ZEdWQWRHVnpkQzVqYjIwaUxDSnBZWFFpT2pFMk9ESTVNRGsyTVROOS51NV9xdklJSlJXWTdYZzNkbjVQMWs0Rm13dFFVVUVnZE1GaWIxY2hIejFrIn0=; Path=/; Secure; HttpOnly; Domain=ticketing.dev",
    },
    body: JSON.stringify(ticket),
  });
  console.log("Task complete");
};

(async () => {
  for (let index = 0; index < 400; index++) {
    doRequest(index);
  }
})();
