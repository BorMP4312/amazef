var organizeByTags = function (toDoObjects) {
    var tags = [];
    toDoObjects.forEach(function (toDo) {
        toDo.tags.forEach(function (tag) {
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        });
    });

    var tagObjects = tags.map(function (tag) {
        var toDosWithTag = toDoObjects.filter(function (toDo) {
            if (toDo.tags.indexOf(tag) !== -1) {
                return toDo.description;
            }
        }).map(function (toDo) { return toDo.description });
        return { "name": tag, "toDos": toDosWithTag };
    });
    console.log(tagObjects)
    return tagObjects;
};

var main = function (toDoObjects) {
    "use strict";

	@@ -28,32 +50,8 @@ var main = function (toDoObjects) {
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("Щелчок на вкладке Теги");

                var organizedByTag = organizeByTags(toDoObjects);

                organizedByTag.forEach(function (tag) {
                    var $tagName = $("<h4>").text(tag.name),
                        $content = $("<ul>");
	@@ -68,16 +66,29 @@ var main = function (toDoObjects) {


            } else if ($element.parent().is(":nth-child(4)")) {
                var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Новая задача: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Тэги: "),
                    $button = $("<button>").text("+");
                $button.on("click", function () {
                    var description = $input.val(),
                        // разделение в соответствии с запятыми
                        tags = $tagInput.val().split(",");
                    toDoObjects.push({ "description": description, "tags": tags });
                    // обновление toDos
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });
                    $input.val("");
                    $tagInput.val("");
                });
                $("main .content").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
            }
            else if ($element.parent().is(":nth-child(5)")) {
                var js = document.createElement('script');
                js.src = "zadanie_app.js";
                document.body.appendChild(js);
            }
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
};
$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});