# MixeesApp
Mobile app for Mixees

All the content is inside `src`.

This is a work in progress, please forgive the bad organization and the amount of commented code :sweat_smile:

This app uses React-native and Redux.

The starting view is `Home.js`, which will have links to all the other important views.

The most important and interesting view is `Searcher.js`.
It includes a MixerGlass, where the selected ingredients will be shown, and a SideMenu that is filled up with the list of ingredients.
If you swipe from the left, said list appears and you can select one of the ingredients. Selecting it again or clicking in the ingredient that now appears in the glass will delete it.

Also interesting is the view `Favorites.js`. It displays a list of ingrdients and, if you click on one of them, you will be taken to a WebView showing the Wikipedia page for that ingredient.

The Redux code is inside `store.js`, `components/BaseView.js`, `actions/` and `reducers/`.

It only works for Android so far, iOS coming soon.
