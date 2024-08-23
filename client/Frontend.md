# About Frontend of this project

- First remove unneseccary code and files that npm makes
- create different files for different pages
- define routes for each page
```bash
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageName/>}/>
        </Routes>
      </BrowserRouter>
```
- **Redux** is used to make a component/state globally available to whole application so that state updation between two or more pages becomes easy, this prevents prop drilling, Ex. this can be used to update cart value when "add to cart" is pressed on some other page. But this is a complicated work since redux dont do this process in one step, there are series of steps htat operate to perform even simplest of tasks. To save ourselves from this hectic we use **Redux Toolkit**

- **Redux Toolkit** makes use of redux easier since most of the things are premade, there are 5 topics to learn about:
1. Store
2. REducer
3. useSelector
4. useDispatch