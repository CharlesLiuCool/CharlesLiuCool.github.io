use yew::prelude::*;


#[function_component(App)]
fn app() -> Html {

    let expanded = use_state(|| false);

    let toggle_expansion = {
        let expanded = expanded.clone();
        Callback::from(move |_| {
            expanded.set(!*expanded); // Toggle the expanded state
        })
    };

    // Step 3: Dynamically add or remove the 'expanded' class based on state
    let white_box = if *expanded {
        "white-box expanded" // Apply expanded class
    } else {
        "white-box" // Default class without expansion
    };


    let menu = if *expanded {
        html! {
            <div>
                <div class="menu-container">
                    <a href="#home" class="menu-item">{ "Home" }</a>
                    <a href="#about" class="menu-item">{ "About" }</a>
                    <a href="#projects" class="menu-item">{ "Projects" }</a>
                </div>

                <div id="home">
                    
                </div>

                <div id="about">

                </div>
            </div>
        }
    } else {
        html! {} // Empty when not expanded
    };

    let projects = if *expanded {
        html! {
            <div id="projects">
                <div class="projects">
                    <h1> { "PROJECTS" } </h1>
                    <div class="project-item">
                        <h2> { "Snowpack-Prediction Artificial Intelligence - SAI" } </h2>
                        <p> { "Details" } </p>
                    </div>
                    <div class="project-item">
                        <h2> { "DecoSavvy" } </h2>
                        <p> { "Details" } </p>
                    </div>
                </div>
            </div>
        }
    } else {
        html! {} // Empty when not expanded
    };

    html! {
        <div>
            <div class={white_box} onclick={toggle_expansion}>
                <div class="center-left">
                    <h1> { "CHARLES LIU" } </h1>
                    <p>
                        { "Computer Science and Mathematics Major" }<br />
                        { "at Washington State University" }
                    </p>
                </div>
            </div>

            { menu }

            { projects }
        </div>
    }
}

fn main() {
    yew::start_app::<App>();
}