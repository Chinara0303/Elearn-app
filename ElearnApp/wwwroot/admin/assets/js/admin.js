$(function () {

    $(document).on("click", ".delete-course", function () {
        let deleteItem = $(this).parent().parent();
        let tbody = $(this).parent().parent().parent().children();
        console.log($(tbody));
        let courseId = $(this).parent().attr("data-id");
        let data = { id: courseId };
        $.ajax({
            url: "Course/Delete",
            type: "Post",
            data: data,
            success: function () {

                if ($(tbody).length == 1) {
                    $(".course-table").remove();
                }
                $(deleteItem).remove();
            }
        })
    })

    $(document).on("click", ".delete-courseimage", function () {
        let imageId = $(this).parent().attr("data-id");
        let deletedElem = $(this).parent().parent();
        let data = { id: imageId };

        let changeElem = $(".courseImage-status"); //hamisini goturur

        $.ajax({
            url: "/Admin/Course/DeleteImage",
            type: "Post",
            data: data,
            success: function (res) {
                if (res.result) {
                    $(deletedElem).remove();
                    let imagesId = $(".images").children().eq(0).attr("data-id");
                    if (res.id == imagesId) {
                        //if ($(changeElem).hasClass("de-active")) {
                        //    console.log("var")
                        //    $(changeElem).addClass("active-status");

                        //    $(changeElem).removeClass("de-active");
                        //}
                    }
                

                }
                else {
                    //debugger
                    //if ($(changeElem).hasClass("active-status")) {

                    //    $(changeElem).removeClass("active-status");
                    //    $(changeElem).addClass("de-active");
                    //}
                    alert("Product images must be min 1")
                }
            }
        })
    })

    //status product img
    $(document).on("click", ".statuses .courseImage-status", function () {
        let courseImageId = $(this).parent().parent().attr("data-id");
        let changeElem = $(this);
        $.ajax({
            url: `/Admin/Course/SetStatus?id=${courseImageId}`,
            type: "Post",
            success: function (res) {

                if (res) {
                    if ($(changeElem).hasClass("de-active")) {

                        $(changeElem).removeClass("de-active");
                        $(changeElem).addClass("active-status");
                    }
                }
                else {
                    if ($(changeElem).hasClass("active-status")) {

                        $(changeElem).removeClass("active-status");
                        $(changeElem).addClass("de-active");
                    }
                }
            }
        })
    })
})