Strength.js
===========

Simple word count strength plugin for a textarea or input field. Forked from Strength.js (password validator).

### Documentation

#### ..:: Getting Started

##### Include the relevant files

Firstly include jQuery and the strength.css and strength.js files. Place these before `&lt;/head&gt;` section

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="strength.js"></script>

##### Create a field you want to validate for word count

    <textarea></textarea>

##### Initiate the plugin

Once you have created your field you will need to initiate the plugin.

At its most basic level you can initiate the plugin like:

    $(document).ready(function ($) {
        $("textarea").strength();

    });

If you want to initiate the plugin with options then you can do so like:

    $('#myTextArea').strength({
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        threshHolds: [5, 10, 15],
        unique: false
    });

#### ..:: Options

<table>
    <thead>
        <tr>
            <th>Variable</th>
            <th>Default Value</th>
            <th>Description</th>
            <th>Valid Options</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>strengthClass</td>
            <td>strength</td>
            <td>The CSS class that you want your field to have applied to it</td>
            <td></td>
        </tr>
        <tr>
            <td>threshHolds</td>
            <td>[5, 10, 15]</td>
            <td>Determines the levels for which we make progress</td>
            <td> less than t[0] is very weak , between t[0] and t[1] is weak, between t[1] and t[2] is medium and greater than t[2] is strong</td>
        </tr>
        <tr>
            <td>unique</td>
            <td>false</td>
            <td>Whether to count unique words or not</td>
            <td></td>
        </tr>
    </tbody>
</table>
