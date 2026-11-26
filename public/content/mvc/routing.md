## What is routing in ASP.NET MVC? {#what-is-routing}
difficulty: beginner

Routing maps an incoming URL to a **controller action**. It decides which code runs for each request.

### How it works

1. The browser requests a URL such as `/products/details/5`.
2. The routing system matches it against the configured route patterns.
3. It picks the controller (`Products`), the action (`Details`) and the parameter (`id = 5`).

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

> [!NOTE]
> The `?` after `id` makes that segment optional, and `=Home` / `=Index` are default values.

### How to Answer in an Interview

Routing is the mechanism that maps an incoming URL to a controller action. A route pattern like controller, action and optional id is matched against the request, and the matching action runs with the values taken from the URL.

## What is the difference between conventional and attribute routing? {#conventional-vs-attribute}
difficulty: intermediate

| Feature | Conventional routing | Attribute routing |
|---|---|---|
| Defined | Centrally, in startup code | On each controller or action |
| Best for | Page-based MVC apps | Web APIs and custom URLs |
| Flexibility | Pattern based | Full control per action |

```csharp
public class ProductsController : Controller
{
    [Route("products/{id:int}")]
    public IActionResult Details(int id)
    {
        return View();
    }
}
```

### How to Answer in an Interview

Conventional routing defines URL patterns in one central place, while attribute routing puts the route directly on the controller or action. I use conventional routing for simple page-based apps and attribute routing when I need precise, custom URLs, which is the usual choice for APIs.