/* License CC0 */

function htmlSpecialChars(s) {
    return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

var test_customization = {
    id_prefix: 'mytable',
    content_to_html: function (content, yx) {
        var ta = document.createElement('textarea');
        ta.innerHTML = htmlSpecialChars(content);
        return ta;
    },
    html_to_content: function (elem) {
        return elem.getElementsByTagName('textarea')[0].value
    },
    merge_contents: function (dir, original, discarded) {
        var cells = [original, ...discarded];
        switch (dir) {
            case "l": return cells.reverse().join(' '); break;
            case "u": return cells.reverse().join(' '); break;
            case "r": return cells.join(' '); break;
            case "d": return cells.join(' '); break;
            default: throw "invalid direction;"
        }
        
    },
    postprocess: function(el) {
        var ta = el.getElementsByTagName('textarea')[0];
        if (ta) { ta.style.height = el.clientHeight + 'px'; }
    },
    init: yx=>""+yx.x+"-"+yx.y,
    init_new_column: yx=>"new col "+yx.x+"-"+yx.y,
    init_new_row: yx=>"new row "+yx.x+"-"+yx.y,
    deep_copy_content: function (content) { /* deep copy of string */ return content; },
}

function table_test(
        {
            // protected
            make_model,
            delete_column,
            delete_row,
            insert_column,
            insert_row,
            fuse_left,
            fuse_up,
            fuse_right,
            fuse_down,
            create_state_from_mod,
            // public
            create_state,
            serialize,
            deserialize,
            update_state
        }
    ) {
    var moad;
    moad = make_model(6,6);
    moad = delete_column(moad, 1, false);
    moad = delete_column(moad, 1, false);
    moad = delete_row(moad, 1, false);
    moad = insert_column(moad, 1, yx => 'new col ' + yx.x + "-" + yx.y);
    moad = insert_row(moad, 1, yx => 'new row ' + yx.x + "-" + yx.y);
    moad = fuse_right(moad, 2, 2);
    moad = fuse_right(moad, 2, 2);
    moad = fuse_down(moad, 2, 2);
    moad = fuse_down(moad, 4, 2);
    moad = fuse_down(moad, 4, 3);
    moad = fuse_down(moad, 2, 2);
    moad = fuse_down(moad, 4, 4);
    moad = fuse_down(moad, 2, 2);
    moad = fuse_down(moad, 2, 2);
    moad = insert_row(moad, 6, yx => 'new bot row ' + yx.x + "-" + yx.y);
    moad = fuse_left(moad, 2, 2);
    moad = fuse_up(moad, 2, 2);
    moad = fuse_up(moad, 2, 1);
    moad = insert_column(moad, 1, yx => 'new col ' + yx.x + "-" + yx.y);
    moad = insert_column(moad, 3, yx => 'new col ' + yx.x + "-" + yx.y);
    moad = insert_row(moad, 6, yx => 'new row ' + yx.x + "-" + yx.y);

    moad = insert_column(moad, 8, yx => 'new col ' + yx.x + "-" + yx.y);
    moad = fuse_right(moad, 0, 7);
    moad = fuse_right(moad, 6, 7);
    moad = fuse_right(moad, 7, 7);
    moad = fuse_right(moad, 1, 2);

    var state = create_state_from_mod(moad);

    update_state(state, function(mod) { return mod; }, [], false, false, true);
}

table_test(table_js(test_customization));
